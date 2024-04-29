#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.yellow.bold(`\n\tWelcome to Amna's To Do List App\n\t`));


let todoList:string[]=[];
let conditions=true;


//creating a function
let main=async()=>{
    while (conditions){
        let options=await inquirer.prompt([{
            name:"choices",
            type:"list",
            message:"select one of the options",
            choices:["AddTask","DeleteTask","UpdateTask","ViewList","Exit"]
        }]);
        if(options.choices==="AddTask"){
            await addTask()
        }
        else if(options.choices==="ViewList"){
            await listView();
        }
        else if(options.choices==="DeleteTask"){
            await deleteTask();
        }
        else if(options.choices==="Exit"){
            conditions=false;
        }else if(options.choices==="UpdateTask"){
            await updatetask()
        }
    }
 };
let addTask=async()=>{
    let taskAdd=await inquirer.prompt([{
        name:"task",
        type:"input",
        message:"Add your task"
    }])
    todoList.push(taskAdd.task);
    console.log(chalk.green(`\n${taskAdd.task} Added successfully\n`));
};
let listView=async()=>{
    console.log(`\nyour To Do List:\n`)
    todoList.forEach((task,index)=>{
        console.log(`${index+1}:${task}`)
    });

};
let deleteTask=async()=>{
    await listView();
    let taskDelete=await inquirer.prompt([{
        name:"index",
        type:"number",
        message:"enter the index of the task you want to delete"
    }]);
    let deletedTask=todoList.splice(taskDelete.index-1,1)
    console.log(chalk.green(`${deletedTask} has been successfully deleted from your list\n`))
    
};
let updatetask=async()=>{
    await listView();
    let taskUpdate=await inquirer.prompt([{
        name:"index",
        type:"number",
        message:"Enter the 'index no' you want to update"
    },
{
    name:"taskk",
    type:"input",
    message:"Enter the task"
}]);
todoList[taskUpdate.index -1] =taskUpdate.taskk;
console.log(chalk.blue.bold(`\ntask has successfully been updated`),(chalk.yellow.bold(`For confirmation "viewlist"`)) )  
}

main()