import { Web3Storage } from 'web3.storage'

function getAccessToken () {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDhBRmY5ZDcyRTg5ODJiQ2VCNDFlMjg1NzgwMEI0QUU1YzlEYTVCMTIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODM3NTYwNzI0NTQsIm5hbWUiOiJ0ZXN0LXRva2VuIn0.lyLbFuujRyMbRY9d9CL6uvoWxYETtQtNdveUCSSTGII";

  // In a real app, it's better to read an access token from an
  // environement variable or other configuration that's kept outside of
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  // return process.env.WEB3STORAGE_TOKEN
}

const storageClient = new Web3Storage({ token: getAccessToken() });

export {
  storageClient,
}