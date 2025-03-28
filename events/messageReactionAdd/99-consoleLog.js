module.exports = (client, reaction, user) => {
	console.log(`Event (messageReactionAdd): ${reaction.emoji}, ${user.username}`)
}
