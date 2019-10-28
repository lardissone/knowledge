# Create a tunnel-only ssh user

[source](http://www.ab-weblog.com/en/creating-a-restricted-ssh-user-for-ssh-tunneling-only/)

```bash
useradd sshtunnel -m -d /home/sshtunnel -s /bin/rbash

echo 'PATH=""' >> .profile

chmod 555 /home/sshtunnel/
cd /home/sshtunnel/
chmod 444 .bash_logout .bashrc .profile
```
