// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ColorMarket {
    address public owner;
    mapping(address => uint256) public colorCredit;
    mapping(bytes32 => uint256) public colorPrices;
    mapping(bytes32 => address) public colorOwners;
    mapping(address => mapping(bytes32 => uint256)) public userColorCount;
    mapping(bytes32 => uint256) public colorLimits; 
    bytes32[] public availableColors;
    uint256 private totalFunds;
    event ColorBought(address indexed buyer, bytes32 color);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
        availableColors = [
            keccak256("Red"),
            keccak256("Green"),
            keccak256("Blue"),
            keccak256("Yellow"),
            keccak256("Purple")
        ];
        colorPrices[keccak256("Red")] = 10 ;    
        colorPrices[keccak256("Green")] = 20 ; 
        colorPrices[keccak256("Blue")] = 30 ;   
        colorPrices[keccak256("Yellow")] = 40 ; 
        colorPrices[keccak256("Purple")] = 50 ; 
        
       
        colorLimits[keccak256("Red")] = 10;
        colorLimits[keccak256("Green")] = 8;
        colorLimits[keccak256("Blue")] = 5;
        colorLimits[keccak256("Yellow")] = 12;
        colorLimits[keccak256("Purple")] = 15;
    }

    function buyColor(uint256 _colorIndex) external payable {
        require(_colorIndex < availableColors.length, "Invalid color index");
        bytes32 selectedColor = availableColors[_colorIndex];
        uint256 price = colorPrices[selectedColor];
        require(msg.value >= price, "Insufficient payment");
        require(colorCredit[msg.sender] +  msg.value >= price, "Exceeds credit limit");
        require(userColorCount[msg.sender][selectedColor] < colorLimits[selectedColor], "Exceeded purchase limit");

        address previousOwner = colorOwners[selectedColor];
        if (previousOwner != address(0)) {
            payable(previousOwner).transfer(price);
            colorCredit[previousOwner] += price;
        }
        totalFunds += msg.value;
        colorOwners[selectedColor] = msg.sender;
        colorCredit[msg.sender] -= price;
        userColorCount[msg.sender][selectedColor]++;
        emit ColorBought(msg.sender, selectedColor);
    }

        function listAvailableColors() external view returns (bytes32[] memory) {
        return availableColors;
    }

    
    function setCreditLimit(uint256 _limit) external {
        colorCredit[msg.sender] = _limit;
    }
    
    function getColorsPurchased() external view returns (bytes32[] memory) {
        uint256 count;
        for (uint256 i = 0; i < availableColors.length; i++) {
            if (colorOwners[availableColors[i]] == msg.sender) {
                count++;
            }
        }
        bytes32[] memory purchasedColors = new bytes32[](count);
        count = 0;
        for (uint256 i = 0; i < availableColors.length; i++) {
            if (colorOwners[availableColors[i]] == msg.sender) {
                purchasedColors[count++] = availableColors[i];
            }
        }
        return purchasedColors;
    }

    function getTotalSpent() external view returns (uint256) {
        uint256 totalSpent;
        for (uint256 i = 0; i < availableColors.length; i++) {
            totalSpent += colorPrices[availableColors[i]] * userColorCount[msg.sender][availableColors[i]];
        }
        return totalSpent;
    }
    
    function withdraw() external onlyOwner {
        
        payable(owner).transfer(totalFunds);
    }
}