const socket = io();

document.querySelector("#message-form").addEventListener("submit",(e)=>{
    e.preventDefault();

    const message = document.querySelector("input").value;
    socket.emit("sendMessage",message)
})
    
// socket.on("countUpdated",(count)=>{
//     console.log("The count has been updated"+count);
// })
socket.on("message",(message)=>{
    console.log(message);
})
// document.querySelector("#increment").addEventListener("click",()=>{
//     console.log("clicked")
//     socket.emit("increment")
// })