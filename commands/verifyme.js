module.exports = {
	name: 'verifyme',
	description: 'Verify me',

	callback: async (client, interaction) => {
		const guild = interaction.member.guild;
		const user = interaction.user;

		const verificationChannel = guild.channels.cache.find((c) => c.name === 'verification');
		const moderatorRole = guild.roles.cache.find((r) => r.name === 'moderator');

		const verifyMessageContent = `<@${user.id}> has requested verification. Moderators with <@&${moderatorRole.id}>, please verify.`;
		const verifyMessage = await verificationChannel.send(verifyMessageContent);
		verifyMessage.react('✅');

		console.log(`${guild.id}`);

		await client.models.verifyMessages.create({
			content: verifyMessageContent,
			guildId: guild.id,
			userId: user.id,
		})

		interaction.reply(`Your verification request has been sent to the moderators.`);
	}
}
