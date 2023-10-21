// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LoanContract {
    struct Loan {
        address lender;
        address borrower;
        uint256 loanAmount;
        uint256 interestRate;
        uint256 repaymentAmount;
        uint256 repaymentTerm;
        uint256 remainingAmount;
        bool isClosed;
    }

    mapping(address => uint256) public balances;
    Loan[] public loans;

    event LoanCreated(
        address indexed lender,
        address indexed borrower,
        uint256 loanAmount,
        uint256 interestRate,
        uint256 repaymentAmount,
        uint256 repaymentTerm
    );
    event LoanRepaid(address indexed borrower, uint256 repaymentAmount);

    function createLoan(
        address _borrower,
        uint256 _loanAmount,
        uint256 _interestRate,
        uint256 _repaymentTerm
    ) external {
        require(_borrower != address(0), "Invalid borrower address.");
        require(_loanAmount > 0, "Loan amount must be greater than zero.");
        require(_interestRate > 0, "Interest rate must be greater than zero.");
        require(_repaymentTerm > 0, "Repayment term must be greater than zero.");

        uint256 repaymentAmount = (_loanAmount * (100 + _interestRate)) / 100;

        Loan memory newLoan = Loan({
            lender: msg.sender,
            borrower: _borrower,
            loanAmount: _loanAmount,
            interestRate: _interestRate,
            repaymentAmount: repaymentAmount,
            repaymentTerm: _repaymentTerm,
            remainingAmount: repaymentAmount,
            isClosed: false
        });

        loans.push(newLoan);

        emit LoanCreated(
            msg.sender,
            _borrower,
            _loanAmount,
            _interestRate,
            repaymentAmount,
            _repaymentTerm
        );
    }

    function repayLoan(uint256 _loanIndex) external payable {
        require(_loanIndex < loans.length, "Invalid loan index.");
        Loan storage loan = loans[_loanIndex];
        require(loan.borrower == msg.sender, "Only the borrower can repay the loan.");
        require(!loan.isClosed, "Loan is already closed.");
        require(msg.value == loan.repaymentAmount, "Incorrect repayment amount.");

        loan.remainingAmount -= msg.value;
        if (loan.remainingAmount == 0) {
            loan.isClosed = true;
        }

        balances[loan.lender] += msg.value;

        emit LoanRepaid(msg.sender, msg.value);
    }

    function withdraw() external {
        require(balances[msg.sender] > 0, "No funds available for withdrawal.");

        uint256 amountToWithdraw = balances[msg.sender];
        balances[msg.sender] = 0;

        payable(msg.sender).transfer(amountToWithdraw);
    }
}

/*
edit
19/10/23
add allProjects function to return all the projects created on the platform
*/
contract ProjectContract {
    // Ak Edit 
    // approved projects count
    uint public projectCount; 
    mapping( uint => ApprovedProject) public IdToApprovedProject;

    mapping(uint => Project) public IdToProjects;

    // Ids or unapproved projects
    uint [] public unapprovedIds;

    struct ApprovedProject {
        string name;
        string creator;
        string description;
        uint256 capitalNeeded;
        address creatorAddress;
        uint Id;
    }

    struct Project {
        string name;
        string creator;
        string description;
        uint256 capitalNeeded;
        mapping(address => uint256) investments;
        address[] investors;
        bool isApproved;
        uint Id;
    }

    address public platformOwner;
    mapping(address => Project) public projects;

    event ProjectCreated(
        address indexed creator,
        string name,
        string description,
        uint256 capitalNeeded,
        uint256 indexed projectId
    );
    event ProjectApproved(
        address indexed creatorAddress,
        string name,
        uint256 indexed projectId
    );
    event InvestmentMade(address indexed investor, address indexed project, uint256 amount);
    event FundsWithdrawn(address indexed project, uint256 amount);
    event ProfitsPaid(address indexed project, uint256 amount);

    constructor() {
        platformOwner = msg.sender;
        projectCount = 0;
    }

    modifier onlyPlatformOwner() {
        require(msg.sender == platformOwner, "Only the platform owner can call this function.");
        _;
    }

    function addId(uint _Id) internal {
        unapprovedIds.push(_Id);
    }

    function removeId(uint _Id) internal{
        for(uint i = 0; i < unapprovedIds.length; i++ ){
            if(unapprovedIds[i] == _Id){
                unapprovedIds[i] = unapprovedIds[unapprovedIds.length - 1];
                unapprovedIds.pop();
            }
        }
    }

    function getUnapprovedIds() public view returns(uint[] memory){
        return unapprovedIds;
    }

    function createProject(
        string memory _name,
        string memory _description,
        uint256 _capitalNeeded
    ) external {
        require(bytes(_name).length > 0, "Project name must not be empty.");
        require(bytes(_description).length > 0, "Project description must not be empty.");
        require(_capitalNeeded > 0, "Capital needed must be greater than zero.");

        Project storage project = projects[msg.sender];
        require(bytes(project.name).length == 0, "Project already exists for this creator.");

        projectCount++; 

        uint currentProjectCount = projectCount;

        // update projects mapping
        project.name = _name;
        project.creator = _getCreatorName();
        project.description = _description;
        project.capitalNeeded = _capitalNeeded;
        project.isApproved = false;
        project.Id = currentProjectCount;

        // update IdToProjects mapping
        Project storage newProject = IdToProjects[currentProjectCount];
        newProject.name = project.name;
        newProject.creator = project.creator;
        newProject.description = project.description;
        newProject.capitalNeeded = project.capitalNeeded;
        newProject.isApproved = project.isApproved;
        newProject.Id = project.Id;

        // add project Id to unapproved projects array
        addId(currentProjectCount);

        emit ProjectCreated(msg.sender, _name, _description, _capitalNeeded, currentProjectCount);
    }

    function _getCreatorName() private pure returns (string memory) {
        // Fetch the creator's name from an off-chain source
        // For simplicity, return a default name here
        return "Anonymous";
    }

    function invest(address _project) external payable {
        require(bytes(projects[_project].name).length > 0, "Project does not exist.");
        require(msg.value > 0, "Investment amount must be greater than zero.");

        Project storage project = projects[_project];
        project.investments[msg.sender] += msg.value;
        project.investors.push(msg.sender);

        emit InvestmentMade(msg.sender, _project, msg.value);
    }

    function withdrawFunds(address _project) external {
        require(msg.sender == _project || msg.sender == platformOwner, "Only the project creator or platform owner can call this function.");

        Project storage project = projects[_project];
        uint256 amountToWithdraw = project.capitalNeeded;

        require(amountToWithdraw > 0, "No funds available for withdrawal.");
        require(project.isApproved, "Project is not approved yet.");

        project.capitalNeeded = 0;

        if (msg.sender == platformOwner) {
            // Transfer funds to the platform owner
            payable(platformOwner).transfer(amountToWithdraw);
        } else {
            // Transfer funds to the project creator
            payable(_project).transfer(amountToWithdraw);
        }

        emit FundsWithdrawn(_project, amountToWithdraw);
    }

    function approveProject(address _project) external onlyPlatformOwner {
        require(bytes(projects[_project].name).length > 0, "Project does not exist.");

        Project storage project = projects[_project];
        require(!project.isApproved, "Project is already approved.");

        project.isApproved = true;

        // Ak edit 
        uint projectId = project.Id;

        IdToApprovedProject[projectId] = ApprovedProject(
            project.name,
            project.creator,
            project.description,
            project.capitalNeeded,
            _project,
            projectId
        );

        // remove project Id from unapproved array
        removeId(projectId);

        emit ProjectApproved( _project, project.name, projectId);
    }

    function payoutProfits(address _project) external {
        require(msg.sender == _project || msg.sender == platformOwner, "Only the project creator or platform owner can call this function.");

        Project storage project = projects[_project];
        require(project.isApproved, "Project is not approved yet.");

        uint256 totalProfits = address(this).balance - project.capitalNeeded;

        require(totalProfits > 0, "No profits available to payout.");

        for (uint256 i = 0; i < project.investors.length; i++) {
            address investor = project.investors[i];
            uint256 investmentAmount = project.investments[investor];
            uint256 profit = (investmentAmount * totalProfits) / project.capitalNeeded;

            project.investments[investor] = 0;

            payable(investor).transfer(profit);

            emit ProfitsPaid(_project, profit);
        }
    }

    // Ak Edit 
    function getAllApprovedProjects() public view returns( ApprovedProject[] memory ){
        // projectCount
        uint currentIndex = 0; 

        ApprovedProject[] memory allApprovedProjects = new ApprovedProject[] (projectCount);

        for(uint i = 0; i < projectCount; i++) {
            uint currentProjectId = i + 1;
            // reference current project details
            ApprovedProject storage currentProject = IdToApprovedProject[currentProjectId];
            // store current project in allApprovedProjects array 
            allApprovedProjects[currentIndex] = currentProject;
            // increase index 
            currentIndex += 1;
        }
        return allApprovedProjects;
    }
}

contract ProfitDistribution {
    mapping(address => uint256) public investments;
    mapping(address => uint256) public profits;

    uint256 public totalInvestment;
    uint256 public totalProfits;

    uint256 public constant RATE_OF_RETURN = 10; // 10% fixed rate of return

    event Investment(address indexed investor, uint256 amount);
    event ProfitDistributed(address indexed investor, uint256 amount);

    function invest() external payable {
        require(msg.value > 0, "Investment amount must be greater than zero.");

        investments[msg.sender] += msg.value;
        totalInvestment += msg.value;

        emit Investment(msg.sender, msg.value);
    }

    function distributeProfits() external {
        require(totalInvestment > 0, "No investments available for profit distribution.");

        uint256 totalReturns = (totalInvestment * RATE_OF_RETURN) / 100;

        for (uint256 i = 0; i < totalInvestment; i++) {
            address investor = payable(msg.sender);
            uint256 investmentAmount = investments[investor];
            uint256 profit = (investmentAmount * RATE_OF_RETURN) / 100;

            profits[investor] += profit;
            totalProfits += profit;

            emit ProfitDistributed(investor, profit);
        }

        // Reset investments and total investment after profit distribution
        totalInvestment = 0;
        for (uint256 i = 0; i < totalInvestment; i++) {
            address investor = payable(msg.sender);
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
}

contract CombinedContract is LoanContract, ProjectContract, ProfitDistribution {
    constructor() {}

}