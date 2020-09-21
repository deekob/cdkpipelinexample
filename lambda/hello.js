exports.handler = async function (event) {
    console.log("request", JSON.stringify(event, undefined,2));
    return {
        statusCode: 200,
        headers: {"Content-Type": "test/plain"},
        body: 'Hello from my CDK pipeline Demo'
    };
};