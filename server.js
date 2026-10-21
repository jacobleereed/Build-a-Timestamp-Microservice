import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line


app.get('/api', (req, res) => {
  const dateVariable = new Date()
  const unixTime = dateVariable.getTime(); 
  const strUTC = dateVariable.toUTCString()
  res.status(200).json({ 
    "unix": unixTime,
    "utc": strUTC
  });
});

app.get("/api/:date", (req, res) => {
  let dateStr = req.params.date

  if (/^\d+$/.test(dateStr)) {
    dateStr = parseInt(dateStr);
  }

  const dateVariable = new Date(dateStr)

  if (dateVariable.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  const unixTime = dateVariable.getTime(); 
  const strUTC = dateVariable.toUTCString()
  res.status(200).json({ 
    "data stream": req.params.date,
    "dateVar": dateVariable,
    "unix": unixTime,
    "utc": strUTC
  });

})


// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});


