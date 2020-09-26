# big brother - an idea
> be notified if someone sketchy joins your server.

## Status
> Bans are 100% functional. Going to start implementing kicks.

## TODO
* [x] Config system
  * [x] Select admin channel
  * [x] Select notification channel
  * [ ] Do proper checks to make sure they selected an actual channel
* [x] Monitoring system
  * [x] Monitor and log bans.
    * [x] On join, check will be done for any bans. 
    * [x] Sends notification embed to desired channel.
    * [ ] Page embeds coming soon™
  * [ ] Monitoring kicks
    * [ ] Check audit log on member leave, if kicked log
    * [ ] On join, check for kicks from all servers.
* [ ] History command
* [ ] Alert Command
  * [ ] To prevent unwanted spam in servers, alerts will be toggles.
* [ ] Bot assets - profile picture, website, etc
  

## Discord
> <a href="https://discord.gg/nB5sKEz">Click here</a> to chat about this bot

## Release History

* 1.0.0
    * ADD: Readme, CommandHandler, MongoDB setup, and help and config started. Also attempting to log all bans, (this is going to be fun). 
* 1.1.0
    * UPDATE: Actually finished the config and help, updated readme, and added checks, notifs, and logging of ban data.
* 1.2.0 
    * ADD: Kick logging and history command, 

[https://github.com/nedinator/big-brother](https://github.com/nedinator/big-brother)

## Contributing

1. Fork it (<https://github.com/nedinator/big-brother/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

