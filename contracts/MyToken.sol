// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/* import contract from Openzapllin
 */

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Basic ERC20.
/// @notice Fixed supply, standard ERC20 token with no further minting after deployment.
/// @dev Uses OpenZeppelin ERC20 and Ownable.sol. all token are minting onces in constructor.

contract MyToken is ERC20, Ownable {
    /// @notice Initial and final total token supply (1,000,000,000 token with 18 decimals).
    /// @dev Immutable for transparency; matches the ERC20 total supply after construction.

    uint256 public immutable INITIAL_SUPPLY = 1_000_000_000 * 10 ** 18;

    /// @notice Deploys the token contract and mints the full fixed supply to the deployer.

    constructor() ERC20("MyToken", "MT") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    /// @notice Increase spender allowance safely
    function increaseAllowance(
        address spender,
        uint256 addedValue
    ) public returns (bool) {
        _approve(
            _msgSender(),
            spender,
            allowance(_msgSender(), spender) + addedValue
        );
        return true;
    }

    /// @notice Decrease spender allowance safely
    function decreaseAllowance(
        address spender,
        uint256 subtractedValue
    ) public returns (bool) {
        uint256 currentAllowance = allowance(_msgSender(), spender);
        require(
            currentAllowance >= subtractedValue,
            "ERC20: decreased allowance below zero"
        );
        _approve(_msgSender(), spender, currentAllowance - subtractedValue);
        return true;
    }
}
