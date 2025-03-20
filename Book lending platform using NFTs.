// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BookLendingNFT {
    struct Book {
        string title;
        string author;
        address owner;
        bool isLent;
        address borrower;
        uint256 returnDeadline;
    }

    mapping(uint256 => Book) public books;
    mapping(address => uint256[]) public ownerBooks;
    uint256 public nextBookId;

    event BookMinted(uint256 indexed bookId, string title, address indexed owner);
    event BookLent(uint256 indexed bookId, address indexed borrower, uint256 returnDeadline);
    event BookReturned(uint256 indexed bookId, address indexed borrower);

    function mintBook(string memory title, string memory author) public {
        books[nextBookId] = Book({
            title: title,
            author: author,
            owner: msg.sender,
            isLent: false,
            borrower: address(0),
            returnDeadline: 0
        });
        ownerBooks[msg.sender].push(nextBookId);
        emit BookMinted(nextBookId, title, msg.sender);
        nextBookId++;
    }

    function lendBook(uint256 bookId, address borrower, uint256 returnPeriod) public {
        require(books[bookId].owner == msg.sender, "Only owner can lend the book");
        require(!books[bookId].isLent, "Book is already lent");
        books[bookId].isLent = true;
        books[bookId].borrower = borrower;
        books[bookId].returnDeadline = block.timestamp + returnPeriod;
        emit BookLent(bookId, borrower, books[bookId].returnDeadline);
    }

    function returnBook(uint256 bookId) public {
        require(books[bookId].isLent, "Book is not lent");
        require(books[bookId].borrower == msg.sender, "Only borrower can return");
        books[bookId].isLent = false;
        books[bookId].borrower = address(0);
        books[bookId].returnDeadline = 0;
        emit BookReturned(bookId, msg.sender);
    }
}
