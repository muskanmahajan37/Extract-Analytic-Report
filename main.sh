npm install
mocha extract.js
accessToken="$(cat Accesstoken.txt)";
fileNumber="$(cat FileNumber.txt)";
curl --location --request GET "https://api.enterprise.apigee.com/v1/$fileNumber/result" \
--header "Authorization: Bearer $accessToken" -o CSVData.zip
cd Extracted
unzip ../CSVData.zip
fileName=$(ls);
gzip -d $fileName
fileName=$(ls);
mv $fileName latest.csv
#cp $fileName $(date).csv
cd ..
node csvtohtml.js
rm ./Extracted/latest.csv
rm CSVData.zip
mocha sendemail.js
rm mynewfile1.html
