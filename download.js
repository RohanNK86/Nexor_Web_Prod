const fs = require('fs');
const https = require('https');

const url = "https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/ride.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy9yaWRlLnBuZyIsImlhdCI6MTc3Mzg1NDA1MywiZXhwIjoxODA1MzkwMDUzfQ.s1KmHQn28AlP7T3WdNomxHrlnZUGFiuom05qCG7c3dE";
const file = fs.createWriteStream("public/icons/ride.png");

https.get(url, function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close();
    console.log("Download completed.");
  });
}).on('error', function(err) {
  fs.unlink("public/icons/ride.png", () => {});
  console.error("Error downloading file:", err.message);
});
