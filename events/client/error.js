module.exports = {
    name: 'error',
    once: false,

     execute(e) {
        console.log(
            `ERROR!
            Code: ${e.code}
            Message: ${e.message}`
        )
    }
}