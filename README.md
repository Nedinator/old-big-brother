# big brother - an idea
> be notified if someone sketchy joins your server.

## Status
> Bans/kicks are 100% functional. Working on commands and polishing everything

## TODO
* [x] Config system
  * [x] Select admin channel
  * [x] Select notification channel
  * [ ] Do proper checks to make sure they selected an actual channel
* [x] Monitoring system
  * [x] Monitor and log bans.
    * [x] On join, check will be done for any bans. 
    * [x] Sends notification embed to desired channel.
  * [x] Monitoring kicks
    * [x] Check audit log on member leave, if kicked log
    * [x] On join, check for kicks from all servers.
* [ ] History command
  * [ ] Page embeds coming soon™ (LOL maybe)
* [x] Alert Command
  * [x] To prevent unwanted spam in servers, alerts will be toggles.
* [ ] Bot assets - profile picture, website, etc

## Get this bot
> <a href="https://discord.com/api/oauth2/authorize?client_id=593429048106025000&permissions=2176&scope=bot">Click this</a> to invite this discord bot to your server. This requires permissions to read audit logs to log the reason of kicks/bans in your server. I may change this to optional later on.  

## Discord
> <a href="https://discord.gg/nB5sKEz">Click here</a> to chat about this bot and other projects im working on.

## Release History

* 0.0.1
    * ADD: Readme, CommandHandler, MongoDB setup, and help and config started. Also attempting to log all bans, (this is going to be fun). 
* 0.0.2
    * UPDATE: Actually finished the config and help, updated readme, and added checks, notifs, and logging of ban data.
* 1.0.0 
    * ADD: Kick logging, alert command, and overall polishing. Updated release history.

[https://github.com/nedinator/big-brother](https://github.com/nedinator/big-brother)

## Contributing

1. Fork it (<https://github.com/nedinator/big-brother/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

