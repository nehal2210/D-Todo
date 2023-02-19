// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;


contract ToDo {
    

    struct task {
        string work;
        bool status;
    }
    
 
    uint256 revenue;
    address owner;

    mapping (address=>task[]) taskList;
    mapping (address=>uint256) rewardList;

    event TaskCreated(uint id, string work,bool status );
    event TaskStatusChange(uint id, string work,bool status );
    event TaskComplete(uint reward);

    error TaskNotExist(uint _id);
    error TaskNotCompleted(uint _id);
    error NotAnOwner(address addr);
    
    constructor(){
        owner = msg.sender;
    }



    modifier  taskExist(uint _id){

        if(taskList[msg.sender].length <=_id){
        revert TaskNotExist(_id);
        }
    _;

}   


    modifier  onlyOwner(){

        if(msg.sender != owner){
        revert NotAnOwner(msg.sender);
        }
    _;

}   



// set with payable
// takes gas fee as well as transaction value
function createTask(string calldata _work) external payable  {

    require(msg.value == 0.1 ether,"0.1 eth require for one task");    
    taskList[msg.sender].push(task(_work,false));
    rewardList[msg.sender]+= msg.value;
    emit    (taskList[msg.sender].length-1, _work, false);
    
} 



// set without payable
// takes only gas fee
function toggleTask(uint _id) external taskExist(_id){
    taskList[msg.sender][_id].status = !taskList[msg.sender][_id].status; 
    emit TaskStatusChange(_id, taskList[msg.sender][_id].work, taskList[msg.sender][_id].status);
}


// read data
function getTasks() external view returns( task[] memory){
    return taskList[msg.sender];
}


function getReward() external view returns( uint256){
    return rewardList[msg.sender];
}



//  set payable without parameter
function TodosCompleted() external payable {
    for (uint i=0; i < taskList[msg.sender].length; i++) 
    {
        if (taskList[msg.sender][i].status == false){

            revert TaskNotCompleted(i);
        }

    }


    uint reward = rewardList[msg.sender];
    uint charges = reward * 1 / 100;
    (bool sent, bytes memory data) = payable(msg.sender).call{value: reward-charges}("");

    require(sent,"Tx Failed");

    //  for (uint i=0; i < taskList[msg.sender].length; i++) 
    // { delete taskList[msg.sender][i];}

    delete  taskList[msg.sender];
    rewardList[msg.sender] = 0;
    revenue += charges;
    emit TaskComplete(reward);
} 


 function getBalance() external view  returns(uint256){

     return address(this).balance;
 }


function withDraw() external onlyOwner{

    (bool sent, bytes memory data) = payable(owner).call{value: revenue}("");
    require(sent,"Tx Failed");
    revenue = 0;
}


function getRevenue() external view onlyOwner returns (uint256){
    return  revenue;
}


function setOwner(address _owner) external onlyOwner(){
    owner = _owner;
}

// send ether directly to contract addresss

    // Function to receive Ether. msg.data must be empty
    receive() external payable { }

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

}

// 0xE3ac6000E557D254ea621f56fe160361A9b17665