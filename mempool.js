var ethers = require("ethers");
const TelegramBot = require('node-telegram-bot-api');
const Web3  = require('web3');
const { decodeRaw } = require("multicall-decode");
const Web3EthContract = require('web3-eth-contract');
const abiDecoder = require('abi-decoder');
const Web3WsProvider = require('web3-providers-ws');
const TOKEN = '5754705238:AAHs5GBMrdiTRvwP7Y474SsMt_NLNWldZbE';
const chatId = '1009204500';
const bot = new TelegramBot(TOKEN, { polling: false });
var url = "wss://quick-chaotic-market.discover.quiknode.pro/ec9bbc598e3633870eea91cc39177bd56e76b7c2/";

const ABI3 = [
  {
     "inputs":[
        {
           "internalType":"address",
           "name":"_factoryV2",
           "type":"address"
        },
        {
           "internalType":"address",
           "name":"factoryV3",
           "type":"address"
        },
        {
           "internalType":"address",
           "name":"_positionManager",
           "type":"address"
        },
        {
           "internalType":"address",
           "name":"_WETH9",
           "type":"address"
        }
     ],
     "stateMutability":"nonpayable",
     "type":"constructor"
  },
  {
     "inputs":[
        
     ],
     "name":"WETH9",
     "outputs":[
        {
           "internalType":"address",
           "name":"",
           "type":"address"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"address",
           "name":"token",
           "type":"address"
        }
     ],
     "name":"approveMax",
     "outputs":[
        
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"address",
           "name":"token",
           "type":"address"
        }
     ],
     "name":"approveMaxMinusOne",
     "outputs":[
        
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"address",
           "name":"token",
           "type":"address"
        }
     ],
     "name":"approveZeroThenMax",
     "outputs":[
        
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"address",
           "name":"token",
           "type":"address"
        }
     ],
     "name":"approveZeroThenMaxMinusOne",
     "outputs":[
        
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"bytes",
           "name":"data",
           "type":"bytes"
        }
     ],
     "name":"callPositionManager",
     "outputs":[
        {
           "internalType":"bytes",
           "name":"result",
           "type":"bytes"
        }
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"bytes[]",
           "name":"paths",
           "type":"bytes[]"
        },
        {
           "internalType":"uint128[]",
           "name":"amounts",
           "type":"uint128[]"
        },
        {
           "internalType":"uint24",
           "name":"maximumTickDivergence",
           "type":"uint24"
        },
        {
           "internalType":"uint32",
           "name":"secondsAgo",
           "type":"uint32"
        }
     ],
     "name":"checkOracleSlippage",
     "outputs":[
        
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"bytes",
           "name":"path",
           "type":"bytes"
        },
        {
           "internalType":"uint24",
           "name":"maximumTickDivergence",
           "type":"uint24"
        },
        {
           "internalType":"uint32",
           "name":"secondsAgo",
           "type":"uint32"
        }
     ],
     "name":"checkOracleSlippage",
     "outputs":[
        
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        {
           "components":[
              {
                 "internalType":"bytes",
                 "name":"path",
                 "type":"bytes"
              },
              {
                 "internalType":"address",
                 "name":"recipient",
                 "type":"address"
              },
              {
                 "internalType":"uint256",
                 "name":"amountIn",
                 "type":"uint256"
              },
              {
                 "internalType":"uint256",
                 "name":"amountOutMinimum",
                 "type":"uint256"
              }
           ],
           "internalType":"struct IV3SwapRouter.ExactInputParams",
           "name":"params",
           "type":"tuple"
        }
     ],
     "name":"exactInput",
     "outputs":[
        {
           "internalType":"uint256",
           "name":"amountOut",
           "type":"uint256"
        }
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "components":[
              {
                 "internalType":"address",
                 "name":"tokenIn",
                 "type":"address"
              },
              {
                 "internalType":"address",
                 "name":"tokenOut",
                 "type":"address"
              },
              {
                 "internalType":"uint24",
                 "name":"fee",
                 "type":"uint24"
              },
              {
                 "internalType":"address",
                 "name":"recipient",
                 "type":"address"
              },
              {
                 "internalType":"uint256",
                 "name":"amountIn",
                 "type":"uint256"
              },
              {
                 "internalType":"uint256",
                 "name":"amountOutMinimum",
                 "type":"uint256"
              },
              {
                 "internalType":"uint160",
                 "name":"sqrtPriceLimitX96",
                 "type":"uint160"
              }
           ],
           "internalType":"struct IV3SwapRouter.ExactInputSingleParams",
           "name":"params",
           "type":"tuple"
        }
     ],
     "name":"exactInputSingle",
     "outputs":[
        {
           "internalType":"uint256",
           "name":"amountOut",
           "type":"uint256"
        }
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "components":[
              {
                 "internalType":"bytes",
                 "name":"path",
                 "type":"bytes"
              },
              {
                 "internalType":"address",
                 "name":"recipient",
                 "type":"address"
              },
              {
                 "internalType":"uint256",
                 "name":"amountOut",
                 "type":"uint256"
              },
              {
                 "internalType":"uint256",
                 "name":"amountInMaximum",
                 "type":"uint256"
              }
           ],
           "internalType":"struct IV3SwapRouter.ExactOutputParams",
           "name":"params",
           "type":"tuple"
        }
     ],
     "name":"exactOutput",
     "outputs":[
        {
           "internalType":"uint256",
           "name":"amountIn",
           "type":"uint256"
        }
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "components":[
              {
                 "internalType":"address",
                 "name":"tokenIn",
                 "type":"address"
              },
              {
                 "internalType":"address",
                 "name":"tokenOut",
                 "type":"address"
              },
              {
                 "internalType":"uint24",
                 "name":"fee",
                 "type":"uint24"
              },
              {
                 "internalType":"address",
                 "name":"recipient",
                 "type":"address"
              },
              {
                 "internalType":"uint256",
                 "name":"amountOut",
                 "type":"uint256"
              },
              {
                 "internalType":"uint256",
                 "name":"amountInMaximum",
                 "type":"uint256"
              },
              {
                 "internalType":"uint160",
                 "name":"sqrtPriceLimitX96",
                 "type":"uint160"
              }
           ],
           "internalType":"struct IV3SwapRouter.ExactOutputSingleParams",
           "name":"params",
           "type":"tuple"
        }
     ],
     "name":"exactOutputSingle",
     "outputs":[
        {
           "internalType":"uint256",
           "name":"amountIn",
           "type":"uint256"
        }
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        
     ],
     "name":"factory",
     "outputs":[
        {
           "internalType":"address",
           "name":"",
           "type":"address"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        
     ],
     "name":"factoryV2",
     "outputs":[
        {
           "internalType":"address",
           "name":"",
           "type":"address"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"address",
           "name":"token",
           "type":"address"
        },
        {
           "internalType":"uint256",
           "name":"amount",
           "type":"uint256"
        }
     ],
     "name":"getApprovalType",
     "outputs":[
        {
           "internalType":"enum IApproveAndCall.ApprovalType",
           "name":"",
           "type":"uint8"
        }
     ],
     "stateMutability":"nonpayable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "components":[
              {
                 "internalType":"address",
                 "name":"token0",
                 "type":"address"
              },
              {
                 "internalType":"address",
                 "name":"token1",
                 "type":"address"
              },
              {
                 "internalType":"uint256",
                 "name":"tokenId",
                 "type":"uint256"
              },
              {
                 "internalType":"uint256",
                 "name":"amount0Min",
                 "type":"uint256"
              },
              {
                 "internalType":"uint256",
                 "name":"amount1Min",
                 "type":"uint256"
              }
           ],
           "internalType":"struct IApproveAndCall.IncreaseLiquidityParams",
           "name":"params",
           "type":"tuple"
        }
     ],
     "name":"increaseLiquidity",
     "outputs":[
        {
           "internalType":"bytes",
           "name":"result",
           "type":"bytes"
        }
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "components":[
              {
                 "internalType":"address",
                 "name":"token0",
                 "type":"address"
              },
              {
                 "internalType":"address",
                 "name":"token1",
                 "type":"address"
              },
              {
                 "internalType":"uint24",
                 "name":"fee",
                 "type":"uint24"
              },
              {
                 "internalType":"int24",
                 "name":"tickLower",
                 "type":"int24"
              },
              {
                 "internalType":"int24",
                 "name":"tickUpper",
                 "type":"int24"
              },
              {
                 "internalType":"uint256",
                 "name":"amount0Min",
                 "type":"uint256"
              },
              {
                 "internalType":"uint256",
                 "name":"amount1Min",
                 "type":"uint256"
              },
              {
                 "internalType":"address",
                 "name":"recipient",
                 "type":"address"
              }
           ],
           "internalType":"struct IApproveAndCall.MintParams",
           "name":"params",
           "type":"tuple"
        }
     ],
     "name":"mint",
     "outputs":[
        {
           "internalType":"bytes",
           "name":"result",
           "type":"bytes"
        }
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"bytes32",
           "name":"previousBlockhash",
           "type":"bytes32"
        },
        {
           "internalType":"bytes[]",
           "name":"data",
           "type":"bytes[]"
        }
     ],
     "name":"multicall",
     "outputs":[
        {
           "internalType":"bytes[]",
           "name":"",
           "type":"bytes[]"
        }
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"uint256",
           "name":"deadline",
           "type":"uint256"
        },
        {
           "internalType":"bytes[]",
           "name":"data",
           "type":"bytes[]"
        }
     ],
     "name":"multicall",
     "outputs":[
        {
           "internalType":"bytes[]",
           "name":"",
           "type":"bytes[]"
        }
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"bytes[]",
           "name":"data",
           "type":"bytes[]"
        }
     ],
     "name":"multicall",
     "outputs":[
        {
           "internalType":"bytes[]",
           "name":"results",
           "type":"bytes[]"
        }
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        
     ],
     "name":"positionManager",
     "outputs":[
        {
           "internalType":"address",
           "name":"",
           "type":"address"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"address",
           "name":"token",
           "type":"address"
        },
        {
           "internalType":"uint256",
           "name":"value",
           "type":"uint256"
        }
     ],
     "name":"pull",
     "outputs":[
        
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        
     ],
     "name":"refundETH",
     "outputs":[
        
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"address",
           "name":"token",
           "type":"address"
        },
        {
           "internalType":"uint256",
           "name":"value",
           "type":"uint256"
        },
        {
           "internalType":"uint256",
           "name":"deadline",
           "type":"uint256"
        },
        {
           "internalType":"uint8",
           "name":"v",
           "type":"uint8"
        },
        {
           "internalType":"bytes32",
           "name":"r",
           "type":"bytes32"
        },
        {
           "internalType":"bytes32",
           "name":"s",
           "type":"bytes32"
        }
     ],
     "name":"selfPermit",
     "outputs":[
        
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"address",
           "name":"token",
           "type":"address"
        },
        {
           "internalType":"uint256",
           "name":"nonce",
           "type":"uint256"
        },
        {
           "internalType":"uint256",
           "name":"expiry",
           "type":"uint256"
        },
        {
           "internalType":"uint8",
           "name":"v",
           "type":"uint8"
        },
        {
           "internalType":"bytes32",
           "name":"r",
           "type":"bytes32"
        },
        {
           "internalType":"bytes32",
           "name":"s",
           "type":"bytes32"
        }
     ],
     "name":"selfPermitAllowed",
     "outputs":[
        
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"address",
           "name":"token",
           "type":"address"
        },
        {
           "internalType":"uint256",
           "name":"nonce",
           "type":"uint256"
        },
        {
           "internalType":"uint256",
           "name":"expiry",
           "type":"uint256"
        },
        {
           "internalType":"uint8",
           "name":"v",
           "type":"uint8"
        },
        {
           "internalType":"bytes32",
           "name":"r",
           "type":"bytes32"
        },
        {
           "internalType":"bytes32",
           "name":"s",
           "type":"bytes32"
        }
     ],
     "name":"selfPermitAllowedIfNecessary",
     "outputs":[
        
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"address",
           "name":"token",
           "type":"address"
        },
        {
           "internalType":"uint256",
           "name":"value",
           "type":"uint256"
        },
        {
           "internalType":"uint256",
           "name":"deadline",
           "type":"uint256"
        },
        {
           "internalType":"uint8",
           "name":"v",
           "type":"uint8"
        },
        {
           "internalType":"bytes32",
           "name":"r",
           "type":"bytes32"
        },
        {
           "internalType":"bytes32",
           "name":"s",
           "type":"bytes32"
        }
     ],
     "name":"selfPermitIfNecessary",
     "outputs":[
        
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"uint256",
           "name":"amountIn",
           "type":"uint256"
        },
        {
           "internalType":"uint256",
           "name":"amountOutMin",
           "type":"uint256"
        },
        {
           "internalType":"address[]",
           "name":"path",
           "type":"address[]"
        },
        {
           "internalType":"address",
           "name":"to",
           "type":"address"
        }
     ],
     "name":"swapExactTokensForTokens",
     "outputs":[
        {
           "internalType":"uint256",
           "name":"amountOut",
           "type":"uint256"
        }
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"uint256",
           "name":"amountOut",
           "type":"uint256"
        },
        {
           "internalType":"uint256",
           "name":"amountInMax",
           "type":"uint256"
        },
        {
           "internalType":"address[]",
           "name":"path",
           "type":"address[]"
        },
        {
           "internalType":"address",
           "name":"to",
           "type":"address"
        }
     ],
     "name":"swapTokensForExactTokens",
     "outputs":[
        {
           "internalType":"uint256",
           "name":"amountIn",
           "type":"uint256"
        }
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"address",
           "name":"token",
           "type":"address"
        },
        {
           "internalType":"uint256",
           "name":"amountMinimum",
           "type":"uint256"
        },
        {
           "internalType":"address",
           "name":"recipient",
           "type":"address"
        }
     ],
     "name":"sweepToken",
     "outputs":[
        
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"address",
           "name":"token",
           "type":"address"
        },
        {
           "internalType":"uint256",
           "name":"amountMinimum",
           "type":"uint256"
        }
     ],
     "name":"sweepToken",
     "outputs":[
        
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"address",
           "name":"token",
           "type":"address"
        },
        {
           "internalType":"uint256",
           "name":"amountMinimum",
           "type":"uint256"
        },
        {
           "internalType":"uint256",
           "name":"feeBips",
           "type":"uint256"
        },
        {
           "internalType":"address",
           "name":"feeRecipient",
           "type":"address"
        }
     ],
     "name":"sweepTokenWithFee",
     "outputs":[
        
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"address",
           "name":"token",
           "type":"address"
        },
        {
           "internalType":"uint256",
           "name":"amountMinimum",
           "type":"uint256"
        },
        {
           "internalType":"address",
           "name":"recipient",
           "type":"address"
        },
        {
           "internalType":"uint256",
           "name":"feeBips",
           "type":"uint256"
        },
        {
           "internalType":"address",
           "name":"feeRecipient",
           "type":"address"
        }
     ],
     "name":"sweepTokenWithFee",
     "outputs":[
        
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"int256",
           "name":"amount0Delta",
           "type":"int256"
        },
        {
           "internalType":"int256",
           "name":"amount1Delta",
           "type":"int256"
        },
        {
           "internalType":"bytes",
           "name":"_data",
           "type":"bytes"
        }
     ],
     "name":"uniswapV3SwapCallback",
     "outputs":[
        
     ],
     "stateMutability":"nonpayable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"uint256",
           "name":"amountMinimum",
           "type":"uint256"
        },
        {
           "internalType":"address",
           "name":"recipient",
           "type":"address"
        }
     ],
     "name":"unwrapWETH9",
     "outputs":[
        
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"uint256",
           "name":"amountMinimum",
           "type":"uint256"
        }
     ],
     "name":"unwrapWETH9",
     "outputs":[
        
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"uint256",
           "name":"amountMinimum",
           "type":"uint256"
        },
        {
           "internalType":"address",
           "name":"recipient",
           "type":"address"
        },
        {
           "internalType":"uint256",
           "name":"feeBips",
           "type":"uint256"
        },
        {
           "internalType":"address",
           "name":"feeRecipient",
           "type":"address"
        }
     ],
     "name":"unwrapWETH9WithFee",
     "outputs":[
        
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"uint256",
           "name":"amountMinimum",
           "type":"uint256"
        },
        {
           "internalType":"uint256",
           "name":"feeBips",
           "type":"uint256"
        },
        {
           "internalType":"address",
           "name":"feeRecipient",
           "type":"address"
        }
     ],
     "name":"unwrapWETH9WithFee",
     "outputs":[
        
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"uint256",
           "name":"value",
           "type":"uint256"
        }
     ],
     "name":"wrapETH",
     "outputs":[
        
     ],
     "stateMutability":"payable",
     "type":"function"
  },
  {
     "stateMutability":"payable",
     "type":"receive"
  }
];

const ERC20_ABI = [
  {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
          {
              "name": "",
              "type": "string"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "_spender",
              "type": "address"
          },
          {
              "name": "_value",
              "type": "uint256"
          }
      ],
      "name": "approve",
      "outputs": [
          {
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "_from",
              "type": "address"
          },
          {
              "name": "_to",
              "type": "address"
          },
          {
              "name": "_value",
              "type": "uint256"
          }
      ],
      "name": "transferFrom",
      "outputs": [
          {
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
          {
              "name": "",
              "type": "uint8"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "name": "_owner",
              "type": "address"
          }
      ],
      "name": "balanceOf",
      "outputs": [
          {
              "name": "balance",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
          {
              "name": "",
              "type": "string"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "_to",
              "type": "address"
          },
          {
              "name": "_value",
              "type": "uint256"
          }
      ],
      "name": "transfer",
      "outputs": [
          {
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "name": "_owner",
              "type": "address"
          },
          {
              "name": "_spender",
              "type": "address"
          }
      ],
      "name": "allowance",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "name": "owner",
              "type": "address"
          },
          {
              "indexed": true,
              "name": "spender",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "value",
              "type": "uint256"
          }
      ],
      "name": "Approval",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "name": "from",
              "type": "address"
          },
          {
              "indexed": true,
              "name": "to",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "value",
              "type": "uint256"
          }
      ],
      "name": "Transfer",
      "type": "event"
  }
];


const ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_factory",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_WETH",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "WETH",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenA",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "tokenB",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amountADesired",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountBDesired",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountAMin",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountBMin",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "addLiquidity",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountA",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountB",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amountTokenDesired",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountTokenMin",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountETHMin",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "addLiquidityETH",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountToken",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountETH",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "factory",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountOut",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reserveIn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reserveOut",
        "type": "uint256"
      }
    ],
    "name": "getAmountIn",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reserveIn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reserveOut",
        "type": "uint256"
      }
    ],
    "name": "getAmountOut",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountOut",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountOut",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      }
    ],
    "name": "getAmountsIn",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      }
    ],
    "name": "getAmountsOut",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountA",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reserveA",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reserveB",
        "type": "uint256"
      }
    ],
    "name": "quote",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountB",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenA",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "tokenB",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountAMin",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountBMin",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "removeLiquidity",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountA",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountB",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountTokenMin",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountETHMin",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "removeLiquidityETH",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountToken",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountETH",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountTokenMin",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountETHMin",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "removeLiquidityETHSupportingFeeOnTransferTokens",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountETH",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountTokenMin",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountETHMin",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "approveMax",
        "type": "bool"
      },
      {
        "internalType": "uint8",
        "name": "v",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "r",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "s",
        "type": "bytes32"
      }
    ],
    "name": "removeLiquidityETHWithPermit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountToken",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountETH",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountTokenMin",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountETHMin",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "approveMax",
        "type": "bool"
      },
      {
        "internalType": "uint8",
        "name": "v",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "r",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "s",
        "type": "bytes32"
      }
    ],
    "name": "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountETH",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenA",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "tokenB",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountAMin",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountBMin",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "approveMax",
        "type": "bool"
      },
      {
        "internalType": "uint8",
        "name": "v",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "r",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "s",
        "type": "bytes32"
      }
    ],
    "name": "removeLiquidityWithPermit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountA",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountB",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountOut",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "swapETHForExactTokens",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountOutMin",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "swapExactETHForTokens",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountOutMin",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "swapExactETHForTokensSupportingFeeOnTransferTokens",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountOutMin",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "swapExactTokensForETH",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountOutMin",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "swapExactTokensForETHSupportingFeeOnTransferTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountOutMin",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "swapExactTokensForTokens",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountOutMin",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "swapExactTokensForTokensSupportingFeeOnTransferTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountOut",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountInMax",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "swapTokensForExactETH",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountOut",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountInMax",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "swapTokensForExactTokens",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
];

const telegrambot = (message, json) => {
  try {
    bot.sendMessage(chatId, message + '\n\n<pre>' + JSON.stringify(json, null, 2) + '</pre>', {
      parse_mode: 'html'
    });
  } catch (err) {
    console.log('Something went wrong when trying to send a Telegram notification', err);
  }
}

var init = function () {
  abiDecoder.addABI(ABI3);
  var customWsProvider = new ethers.providers.WebSocketProvider(url);
  const webSocketProvider = new Web3WsProvider(url);
  const web3 = new Web3(webSocketProvider);
  const iface = new ethers.utils.Interface(ABI3);
  Web3EthContract.setProvider(url);
  // const subscription = web3.eth.subscribe('pendingTransactions', (err, res) => {
  //   if (err) console.error(err);
  // });
  // subscription.on('data',async (tx)=>{
  //   let transaction = await web3.eth.getTransaction(tx);
  //   // console.log(transaction);
   
  //   // if(transaction!=null&&transaction.input.indexOf("0x5ae401dc")!==-1){
  //   let data = abiDecoder.decodeMethod(transaction.input);
  //   console.log(transaction);
  //   console.log(data);
  //   // console.log(abiDecoder.decodeMethod(data.params[1].value));
  //   // const paths = data.params.filter((param) => param.name === "data");
  //   // cons
    // const fromToken = paths[0];
    // const toToken = paths.slice(-1)[0];
    // const amountIn = data.params.filter((param) => param.name === "amountIn")[0]
    //   .value;
    // const amountOutMin = data.params.filter(
    //   (param) => param.name === "amountOutMin"
    // )[0].value;
    // const fromTokenSymbol = await getTokenSymbol(fromToken);
    // const toTokenSymbol = await getTokenSymbol(toToken);
    // console.log(
    //   `Exchanged ${amountIn} of ${fromTokenSymbol} to at least ${amountOutMin} ${toTokenSymbol}`
    // );
  // }

  // })

  const usdtToken = "0xdac17f958d2ee523a2206206994597c13d831ec7";
  const weth = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";

  customWsProvider.on("pending", (tx) => {
    customWsProvider.getTransaction(tx).then(async function (transaction) {
    
     //swap transaction
      if(transaction!=null&&(transaction.data.indexOf("0x5ae401dc")!==-1)){
        let decodedData = iface.parseTransaction({ data: transaction.data, value: transaction.value });
        // console.log(await decodeRaw(transaction.data));
        // let decodedData1 = iface.parseTransaction({ data: transaction.data, value: transaction.value });
        console.log(transaction);

        decodedData.args[1].forEach(async element => {
        let data = abiDecoder.decodeMethod(element);
       
        console.log(data);
        if(data.name.indexOf('swap')!==-1){
        const paths = data.params.filter((param) => param.name === "path")[0].value;
        const fromToken = paths[0];
        const toToken = paths.slice(-1)[0];
        const amountIn = data.params.filter((param) => {if(param.name === "amountIn"||param.name === "amountInMax"){return param;};})[0].value;
        const amountInEth = amountIn/10**18;
        const amountOutMin = data.params.filter(
          (param) => {if(param.name === "amountOutMin"||param.name === "amountOut"){return param;}})[0].value;
        const amountOutInt = amountOutMin

        console.log(paths)
        if(fromToken.indexOf(weth)!==-1){
          console.log(paths)
          if(amountInEth>0.1){
            const tokenInstance = new Web3EthContract(ERC20_ABI, toToken);
            const tokenName = await tokenInstance.methods.name().call();
            const tokenDecimal = await tokenInstance.methods.decimals().call()
            const tokenSymbol = await tokenInstance.methods.symbol().call();
            console.log(tokenDecimal);
            console.log(tokenSymbol);
            const message = "Exchanged " + amountInEth + " of ETH to " + amountOutInt/10**tokenDecimal + " " +tokenSymbol;
            console.log(message);
            telegrambot("Alert", message);
          }
        }
        }
        // console.log(parseInt(decodedData.args[1]._hex,16)/10**18);
        
      })
    }
        

    // //remove liquidity: 0xded9382a
    //   if(transaction!=null&&(transaction.data.indexOf("0xded9382a")!==-1)){
    //     let decodedData = iface.parseTransaction({ data: transaction.data, value: transaction.value });
    //     // console.log(await decodeRaw(transaction.data));
    //     // let decodedData1 = iface.parseTransaction({ data: transaction.data, value: transaction.value });
    //     console.log(decodedData);
    //     // let data = abiDecoder.decodeMethod(decodedData.args[1].data[0]);
       
    //     // decodedData.args[0].forEach(element => {
    //     //   console.log( abiDecoder.decodeMethod(element));
    //     // });
      
    //   }
    //   //Add liquidity: 0xf305d719
    //   if(transaction!=null&&(transaction.data.indexOf("0xf305d719")!==-1)){
    //     let decodedData = iface.parseTransaction({ data: transaction.data, value: transaction.value });
    //     // console.log(await decodeRaw(transaction.data));
    //     // let decodedData1 = iface.parseTransaction({ data: transaction.data, value: transaction.value });
    //     console.log(decodedData);
    //     // let data = abiDecoder.decodeMethod(decodedData.args[1].data[0]);
       
    //     // decodedData.args[0].forEach(element => {
    //     //   console.log( abiDecoder.decodeMethod(element));
    //     // });
      
    //   }
    });
  });

  customWsProvider._websocket.on("error", async () => {
    console.log(`Unable to connect to ${ep.subdomain} retrying in 3s...`);
    setTimeout(init, 3000);
  });
  customWsProvider._websocket.on("close", async (code) => {
    console.log(
      `Connection lost with code ${code}! Attempting reconnect in 3s...`
    );
    customWsProvider._websocket.terminate();
    setTimeout(init, 3000);
  });
};

    
init();