// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

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

    /*function invest(address _project) external payable {
        require(
            bytes(projects[_project].name).length > 0,
            "Project does not exist."
        );
        require(msg.value > 0, "Investment amount must be greater than zero.");
        Project storage project = projects[_project];
        project.investments[msg.sender] += msg.value;
        project.investors.push(msg.sender);
        emit InvestmentMade(msg.sender, _project, msg.value);
    }*/

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
