const contractAddress = "0xaE42aeda22F56dFF8a00a601DbD44eFd12dbb0A6";
const contractABI = [
    [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "bookId",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "borrower",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "returnDeadline",
                    "type": "uint256"
                }
            ],
            "name": "BookLent",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "bookId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "title",
                    "type": "string"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "BookMinted",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "bookId",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "borrower",
                    "type": "address"
                }
            ],
            "name": "BookReturned",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "books",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "title",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "author",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "isLent",
                    "type": "bool"
                },
                {
                    "internalType": "address",
                    "name": "borrower",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "returnDeadline",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "bookId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "borrower",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "returnPeriod",
                    "type": "uint256"
                }
            ],
            "name": "lendBook",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "title",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "author",
                    "type": "string"
                }
            ],
            "name": "mintBook",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "nextBookId",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "ownerBooks",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "bookId",
                    "type": "uint256"
                }
            ],
            "name": "returnBook",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
];

let web3;
let contract;

window.addEventListener("load", async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        contract = new web3.eth.Contract(contractABI, contractAddress);
    } else {
        alert("Please install MetaMask to use this feature.");
    }
});

async function mintBook() {
    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("bookAuthor").value;
    const accounts = await web3.eth.getAccounts();
    await contract.methods.mintBook(title, author).send({ from: accounts[0] });
    alert("Book Minted Successfully!");
}

async function lendBook() {
    const bookId = document.getElementById("lendBookId").value;
    const borrower = document.getElementById("borrowerAddress").value;
    const returnPeriod = document.getElementById("returnPeriod").value;
    const accounts = await web3.eth.getAccounts();
    await contract.methods.lendBook(bookId, borrower, returnPeriod).send({ from: accounts[0] });
    alert("Book Lent Successfully!");
}

async function returnBook() {
    const bookId = document.getElementById("returnBookId").value;
    const accounts = await web3.eth.getAccounts();
    await contract.methods.returnBook(bookId).send({ from: accounts[0] });
    alert("Book Returned Successfully!");
}
