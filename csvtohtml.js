var fs = require('fs');
var csv = fs.readFileSync('./Extracted/latest.csv', 'utf8');
var data = csv;
var lines = data.split("\n"),output = [],i,totalTraffic=0,totalSendPayoutTraffic=0,totalValidateTraffic=0;
var todaysDay= new Date();
for (i = 0; i < 1; i++)
  output.push("<tr><th>SNo</th><th>Sum Message Count</th><th>Proxy Pathsuffix</th><th>Response Status Code</th><th>Day</th></tr>");
for (i = 1; i < lines.length - 1; i++){
  output.push("<tr><td>"+i+"</td><td>" + lines[i].split(",").join("</td><td>") + "</td></tr>");
  row=lines[i].split(",");
  console.log(row);
  totalTraffic=totalTraffic+parseInt(row[0]);
  if(row[1]=="/sendpayout"){
    totalSendPayoutTraffic=totalSendPayoutTraffic+parseInt(row[0]);
  }
  if(row[1]=="/validatepayout"){
    totalValidateTraffic=totalValidateTraffic+parseInt(row[0]);
  }
  
}
for (i = lines.length; i < lines.length + 1; i++){
  output.push("<tr><td>Total</td><td>"+totalTraffic+"</td><td></td><td></td><td></td></tr>");
  output = "<table id =" + "customers>" + output.join("") + "</table>";
}
console.log(output);

//HTML Body Tempelate

var htmlbody = '   <!DOCTYPE html>  ' +
  '   <html>  ' +
  '   <head>  ' +
  '   <style>  ' +
  '   #customers {  ' +
  '     font-family: Arial, Helvetica, sans-serif;  ' +
  '     border-collapse: collapse;  ' +
  '     width: 100%;  ' +
  '   }  ' +
  '     ' +
  '   #customers td, #customers th {  ' +
  '     border: 1px solid #ddd;  ' +
  '     padding: 8px;  ' +
  '   }  ' +
  '     ' +
  '   #customers tr:nth-child(even){background-color: #f2f2f2;}  ' +
  '     ' +
  '   #customers tr:hover {background-color: #ddd;}  ' +
  '     ' +
  '   #customers th {  ' +
  '     padding-top: 12px;  ' +
  '     padding-bottom: 12px;  ' +
  '     text-align: left;  ' +
  '     background-color:#39A8FF;  ' +
  '     color: white;  ' +
  '   }  ' +
  '   </style>  ' +
  '   </head>  ' +
  '   <body>  ' +
  'Hi<br><br><h3>Please find the daily analytics report of VISA dated <b> '+todaysDay+'</b>.</h3></br></br> In apigee production envionment total traffic is <b> '+ totalTraffic+'</b> in which sendPayout traffic is <b>'+totalSendPayoutTraffic+' </b> and validate is <b> '+totalValidateTraffic+'</b>. For more details please find the table below<br><br>' +
  output +
  '  <br/><br> Thanks<br/>NeosAlpha Team</body>  ' +
  '  </html>  ';


//Writing HTML Code in mynewfile1.html  

fs.writeFile('mynewfile1.html', htmlbody, function (err) {
  if (err) throw err;
  console.log('Saved!');
});