// backend notes 
//  What is WriteFile ??
// Ans: writeFile is a function typically used in programming languages or environments that provide file system access to write data to a file. The specific implementation and usage may vary depending on the programming language or platform being used.
// In Node.js, for example, writeFile is a function provided by the built-in fs (file system) module. It is used to asynchronously write data to a file, creating the file if it does not exist, or overwriting the file if it already exists. Here's the basic syntax in Node.js:


const  fs = require('fs');

fs.writeFile("hey.txt" , "Hello" , function (err){
    if (err) console.error(err)
    else console.log("Done")
})

// fs.appendFile   text add kerna to the end of the file

fs.appendFile("hyy Abhi" , "Kumar" ,function() {
    if(err) console.error(err)
    else console,log("Done")
})

// fs.rename text rename

fs.rename("hyy Abhi", "hyy Sonu", function () {
  if (err) console.error(err);
  else console, log("Done");
});

fs.copyFile("c/loacal/disk", "hyy Sonu", function () {
  if (err) console.error(err);
  else console, log("Done");
});


fs.unlink("c/loacal/disk", "hyy Sonu", function () {
  if (err) console.error(err);
  else console, log("Done");
});


fs.readFile("c/loacal/disk", "hyy Sonu", function(){
  if (err){
    console.log("Error", err);
  }else{
    console.log(result);
  }
})

fs.appendFileSync("c/loacal/disk", new Date().getTime().toLocaleString());



