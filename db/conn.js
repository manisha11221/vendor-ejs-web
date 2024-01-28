// const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://form:fVMFMiFP4HLHkXM9@cluster0.cqvzurc.mongodb.net/?retryWrites=true&w=majority',{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => 
//     console.log("connection successfully...")
// ).catch((err) => {
//     console.log(err);
// });
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kevalsolanki907:CGt4D8AzbujGkR5n@cluster0.xsonzqi.mongodb.net/vendor-Table', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
  console.log("Connection successfully...");
}).catch((err) => {
  console.log(err);
});
