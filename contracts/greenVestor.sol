// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProfitDistribution {
    address public owner;
    mapping(address => uint256) public investments;
    mapping(address => uint256) public profits;

    uint256 public totalInvestment;
    uint256 public totalProfits;

    uint256 public RATE_OF_RETURN = 10; // 10% fixed rate of return

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
    event Investment(
        address indexed investor,
        uint256 amount,
        uint256 investmentAmount
    );

    //event Investment(address indexed investor, uint256 amount);
    event ProfitDistributed(address indexed investor, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    // function invest(uint256 _investmentAmount) external payable {
    //     require(
    //         _investmentAmount > 0,
    //         "Investment amount must be greater than zero."
    //     );
    //     //require(_investmentAmount == msg.value, "Sent value must match the specified amount.");

    //     investments[msg.sender] += _investmentAmount;
    //     totalInvestment += _investmentAmount;

    //     emit Investment(msg.sender, _investmentAmount, _investmentAmount);
    // }

    //function invest() external payable {
    //    require(msg.value > 0, "Investment amount must be greater than zero.");
    //
    //    investments[msg.sender] += msg.value;
    //    totalInvestment += msg.value;
    //
    //    emit Investment(msg.sender, msg.value);
    //}

    function distributeProfits() external {
        require(
            totalInvestment > 0,
            "No investments available for profit distribution."
        );

        for (uint256 i = 0; i < totalInvestment; i++) {
            address investor = msg.sender;
            uint256 investmentAmount = investments[investor];
            uint256 profit = (investmentAmount * RATE_OF_RETURN) / 100;

            profits[investor] += profit;
            totalProfits += profit;

            emit ProfitDistributed(investor, profit);
        }

        // Reset investments and total investment after profit distribution
        totalInvestment = 0;
        for (uint256 i = 0; i < totalInvestment; i++) {
            address investor = msg.sender;
            investments[investor] = 0;
        }
    }

    function withdrawProfits() external {
        require(profits[msg.sender] > 0, "No profits available to withdraw.");

        uint256 amountToWithdraw = profits[msg.sender];
        profits[msg.sender] = 0;
        totalProfits -= amountToWithdraw;

        payable(msg.sender).transfer(amountToWithdraw);
    }

    function getRateOfReturn() external view returns (uint256) {
        return RATE_OF_RETURN;
    }

    function setRateOfReturn(uint256 newRate) external onlyOwner {
        RATE_OF_RETURN = newRate;
    }

    // Getter function to get the total investments of an investor
    function getInvestment(address investor) external view returns (uint256) {
        return investments[investor];
    }

    // Getter function to get the total profits of an investor
    function getProfits(address investor) external view returns (uint256) {
        return profits[investor];
    }

    // Getter function to get the total investment value
    function getTotalInvestment() external view returns (uint256) {
        return totalInvestment;
    }

    // Getter function to get the total profits distributed
    function getTotalProfits() external view returns (uint256) {
        return totalProfits;
    }
}

contract ProjectContract {
    struct Project {
        string name;
        address creator;
        string description;
        uint256 capitalNeeded;
        mapping(address => uint256) investments;
        address[] investors;
        bool isApproved;
    }

    address public platformOwner;
    mapping(address => Project) public projects;

    event ProjectCreated(
        address indexed creator,
        string name,
        string description,
        uint256 capitalNeeded
    );
    event InvestmentMade(
        address indexed investor,
        address indexed project,
        uint256 amount
    );
    event FundsWithdrawn(address indexed project, uint256 amount);
    event ProfitsPaid(address indexed project, uint256 amount);

    constructor() {
        platformOwner = msg.sender;
    }

    modifier onlyPlatformOwner() {
        require(
            msg.sender == platformOwner,
            "Only the platform owner can call this function."
        );
        _;
    }

    function createProject(
        string memory _name,
        string memory _description,
        uint256 _capitalNeeded
    ) external {
        require(bytes(_name).length > 0, "Project name must not be empty.");
        require(
            bytes(_description).length > 0,
            "Project description must not be empty."
        );
        require(
            _capitalNeeded > 0,
            "Capital needed must be greater than zero."
        );

        Project storage project = projects[msg.sender];
        require(
            bytes(project.name).length == 0,
            "Project already exists for this creator."
        );

        project.name = _name;
        project.creator = msg.sender;
        project.description = _description;
        project.capitalNeeded = _capitalNeeded;
        project.isApproved = false;

        emit ProjectCreated(msg.sender, _name, _description, _capitalNeeded);
    }

    function invest(address _project, uint256 _amount) external payable {
        require(
            bytes(projects[_project].name).length > 0,
            "Project does not exist."
        );
        require(_amount > 0, "Investment amount must be greater than zero.");
        //require(msg.value == _amount, "Sent value must match the specified amount.");

        Project storage project = projects[_project];
        project.investments[msg.sender] += _amount;
        project.investors.push(msg.sender);

        emit InvestmentMade(msg.sender, _project, _amount);
    }

    function payoutProfits(address _project) external payable {
        require(
            msg.sender == _project || msg.sender == platformOwner,
            "Only the project creator or platform owner can call this function."
        );

        Project storage project = projects[_project];
        require(project.isApproved, "Project is not approved yet.");

        uint256 totalProfits = address(this).balance - project.capitalNeeded;

        require(totalProfits > 0, "No profits available to payout.");

        for (uint256 i = 0; i < project.investors.length; i++) {
            address investor = project.investors[i];
            uint256 investmentAmount = project.investments[investor];
            uint256 profit = (investmentAmount * totalProfits) /
                project.capitalNeeded;

            project.investments[investor] = 0;

            payable(investor).transfer(profit);

            emit ProfitsPaid(_project, profit);
        }
    }

    function withdrawFunds(address _project) external payable {
        Project storage project = projects[_project];

        require(
            msg.sender == project.creator || msg.sender == platformOwner,
            "Only the project creator or platform owner can call this function."
        );

        uint256 amountToWithdraw = project.capitalNeeded;

        require(amountToWithdraw > 0, "No funds available for withdrawal.");
        require(project.isApproved, "Project is not approved yet.");

        project.capitalNeeded = 0;

        if (msg.sender == platformOwner) {
            // Transfer funds to the platform owner
            payable(platformOwner).transfer(amountToWithdraw);
        } else {
            // Transfer funds to the project creator
            payable(project.creator).transfer(amountToWithdraw);
        }

        emit FundsWithdrawn(_project, amountToWithdraw);
    }

    function approveProject(address _project) external onlyPlatformOwner {
        require(
            bytes(projects[_project].name).length > 0,
            "Project does not exist."
        );

        Project storage project = projects[_project];
        require(!project.isApproved, "Project is already approved.");

        project.isApproved = true;
    }

    function getProjectDetails(
        address _project
    )
        external
        view
        returns (
            string memory name,
            address creator,
            string memory description,
            uint256 capitalNeeded,
            bool isApproved
        )
    {
        Project storage project = projects[_project];
        return (
            project.name,
            project.creator,
            project.description,
            project.capitalNeeded,
            project.isApproved
        );
    }

    function getInvestorCount(
        address _project
    ) external view returns (uint256) {
        Project storage project = projects[_project];
        return project.investors.length;
    }

    function getInvestmentAmount(
        address _project,
        address investor
    ) external view returns (uint256) {
        Project storage project = projects[_project];
        return project.investments[investor];
    }

    function setProjectApprovalStatus(
        address _project,
        bool approved
    ) external onlyPlatformOwner {
        Project storage project = projects[_project];
        project.isApproved = approved;
    }
}

contract greenVestor is ProfitDistribution, ProjectContract {}
