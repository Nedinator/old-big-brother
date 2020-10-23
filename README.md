# Big Brother
> Be notified if someone sketchy joins your server.

## TODO

* [x] Config system
  * [x] Select admin channel
  * [x] Select alert channel
  * [x] Do proper checks to make sure they selected an actual channel
* [x] Monitoring system
  * [x] Monitor and log bans.
    * [x] On join, check will be done for any bans. 
    * [x] Sends notification embed to desired channel.
  * [x] Monitoring kicks
    * [x] Check audit log on member leave, if kicked log
    * [x] On join, check for kicks from all servers.
* [x] History command
* [x] Alert Command
  * [x] To prevent unwanted spam in servers, alerts will be toggles.

## Status

> I've stopped hosting this bot as it isn't something I intend on continuing. 

## Commands

1. !alerts <on/off> - Activate alerts for your server and be notified how many kicks and bans users joining have.
2. !config <admin/alert> <channel id> - Set up admin channel and alert channels.
3. !history <kick/ban> <user id> - Get the history of a user in your server. To use this, the bot must have permission to view audit logs and the user must be in your server.

## Contributing

1. Fork it (<https://github.com/nedinator/big-brother/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

