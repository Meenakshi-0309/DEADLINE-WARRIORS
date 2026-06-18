const TaskHistory = require("../models/TaskHistory");

exports.getTaskHistory = async (req, res) => {
  try {
    const history = await TaskHistory.find({
      user: req.user
    }).sort({ completedAt: -1 });

    res.json(history);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.verifyTask = async (req, res) => {

  try {

    let newStatus;


    if(req.body.status === "Completed"){

      newStatus = "Verified Completed";

    }
    else if(req.body.status === "Overdue"){

      newStatus = "Overdue";

    }


    const task =
      await TaskHistory.findByIdAndUpdate(

        req.params.id,

        {
          status:newStatus
        },

        {
          new:true
        }

      );


    if(!task){

      return res.status(404).json({
        message:"Task not found"
      });

    }


    res.json(task);


  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};

exports.deleteHistoryTask = async(req,res)=>{

  try{

    const task = await TaskHistory.findByIdAndDelete(
      req.params.id
    );


    if(!task){
      return res.status(404).json({
        message:"Task not found"
      });
    }


    res.json({
      message:"History task deleted permanently"
    });


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};