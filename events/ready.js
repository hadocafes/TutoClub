const { ActivityType, EmbedBuilder } = require("discord.js");
const { version } = require('../package.json');
const { getChannelVideos } = require('yt-channel-info')
const mongoose = require('mongoose')
const Video = require('../db/video.js')
require('dotenv').config()

module.exports = {
	name: 'ready',

	async execute (interaction, client) {

		client.user.setPresence({
			activities: [{
				name: 'TutoDiscord',
				type: ActivityType.Watching
			}],
			status: 'idle'
		});
	
		console.clear();
		console.log(`TutoClub [Versión ${version}] \n\n✅ ¡BOT INICIADO!`);
		
		//base de datos
		mongoose.connect(process.env.mongo_uri, {
			useNewUrlParser: true,
    		useUnifiedTopology: true
		}).then(() => console.log('¡TutoClub conectado a MongoDB!'))

		//youtube
		setInterval(async () => {
			const videos = await getChannelVideos({
				channelId: process.env.ytChannelId,
				channelIdType: 0
			}).catch((err) => console.error(err))

			if(videos.length <= 0) return

			const lastVideo = videos.items[0]
			const lastVideoID = lastVideo.videoId

			const video_ = await Video.findOne({ x: '0' })

			const dbVideo = video_.videoID

			if(dbVideo != lastVideoID) {
				
				await Video.findOneAndDelete({ x: '0' })
				let newDatabase = new Video({
					x: '0',
					videoID: `${lastVideoID}`
				})
				newDatabase.save()

				client.channels.cache.get('985120656121299007').send({
					embeds: [
						new EmbedBuilder()
							.setTitle(`${lastVideo.title}`)
							.setURL(`https://www.youtube.com/watch?v=${lastVideoID}`)
							.setAuthor({
								name: 'TutoDiscord',
								iconURL: 'https://cdn.discordapp.com/avatars/987457065800835183/eb30c6e039edf3aac8217a1522d759dd.png?size=1024',
								url: 'https://www.youtube.com/tutodiscord'
							})
							.addFields({
								name: 'Descripción',
								value: `${lastVideo.description}`,
								inline: false
							})
							.setFooter({
								text: 'TutoDiscord YouTube',
								iconURL: 'https://www.bing.com/th?id=OIP.nbOuDweU9xZoI3gcqCEBWwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2'
							})
							.setColor('Red')
					]
				})
			}
		}, 15000) //no tocar
	}
}