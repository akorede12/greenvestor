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
    event Investment(address indexed investor, uint256 amount, uint256 investmentAmount);

    //event Investment(address indexed investor, uint256 amount);
    event ProfitDistributed(address indexed investor, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function invest(uint256 _investmentAmount) external payable {
        require(_investmentAmount > 0, "Investment amount must be greater than zero.");
        //require(_investmentAmount == msg.value, "Sent value must match the specified amount.");

        investments[msg.sender] += _investmentAmount;
        totalInvestment += _investmentAmount;

        emit Investment(msg.sender, _investmentAmount, _investmentAmount);
    }


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