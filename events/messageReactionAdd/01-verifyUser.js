module.exports = async (client, reaction, user) => {
	console.log(`${reaction.emoji}`)

	if (reaction.emoji.toString() !== '✅') return;
	
	const messageGuild = reaction.message.guild;
	const guildMember = messageGuild.members.cache.find((u) => u.id === user.id);

	console.log(`${messageGuild} ${guildMember}`);

	if (!(guildMember.roles.cache.find((r) => r.name === 'moderator'))) return;

	const messageContents = reaction.message.content;

	console.log(`${messageContents}`);

	const verifyMessages = await client.models.verifyMessages.findAll({ where: { content: messageContents } });

	console.log(`${verifyMessages}`);

	for (const verifyMessage of verifyMessages) {
		console.log(`${verifyMessage.userId}`);
		const guild = client.guilds.cache.find((g) => g.id.toString() === verifyMessage.guildId);
		console.log(`${guild}`);
		const user = guild.members.cache.find((u) => u.id.toString() === verifyMessage.userId);
		console.log(`${user}`)
		const memberRole = guild.roles.cache.find((r) => r.name === "member");
		console.log(`${memberRole}`);

		user.roles.add(memberRole)
	}

	client.models.verifyMessages.destroy({ where: { content: messageContents } });
}
