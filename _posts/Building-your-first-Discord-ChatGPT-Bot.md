---
title: 'Building your first Discord ChatGPT Bot'
excerpt: 'In this tutorial, I will guide you through building your initial Discord app using JavaScript to interact with ChatGPT via slash commands. '
date: '2023-05-18 01:00:00'
tags: 'ChatGPT Discord ChatGPT Discord Bot'
---

## What we'll be building

In this tutorial, I will guide you through building your initial Discord app using JavaScript to interact with ChatGPT via slash commands.

Here's what the finished Discord ChatGPT Bot will look like:

<p align="center"><img src="https://assets.wuxinhua.com/blog/assets/posts/Discord-ChatGPT-gif.gif" width="800px" /></p>

## Resources used in this guide

- [AirCode](https://aircode.io) An online platform for Building and hosting Node.js Apps.
- [discord.js](https://discord.js.org/) [discord-interactions](https://github.com/discord/discord-interactions-js) Api and library types.
- [OpenAI](https://www.npmjs.com/package/openai) Send messages to ChatGPT.


## Step 1: Creating an App and Bot

First, you'll need to create an app in the developer portal if you don't have one already:

1. Go to [Discord Developer Portal.](https://discord.com/developers/applications) (login using your discord account if required). Click on the "New Application" button at the top right. Give your application a name and click "Create"
<p align="center"><img src="https://assets.wuxinhua.com/blog/assets/posts/Step-1-Creating-Discord-App-Bot.png" width="800px" /></p>

2. Copy your Public Key and Application ID, and put them somewhere locally (we'll need these later)

<p align="center"><img src="https://assets.wuxinhua.com/blog/assets/posts/Step-1-Creating-Discord-App-Bot-Key.png" width="800px" /></p>

3. Click on the "Bot" tab on the left side of the screen.Click on the "Add Bot" button on the right. After the bot is created, Reset the token for your bot, and store it somewhere safe as a secret.(we'll need these later)

<p align="center"><img src="https://assets.wuxinhua.com/blog/assets/posts/Step-1-3-Creating-Discord-App-Bot.png" width="800px" /></p>

Once the application and bot is created, Here, you can customize them by adding an icon, description, etc.

## Step 2: Setting Scope and Authorization

Click on OAuth2 in the left sidebar, then select URL Generator.

Add two scopes:

- `applications.commands` which allows your app to create commands. `bot` which adds your bot user.
- After you select bot, you can also select different permissions for your bot. For now, just check `Send Messages`.

<p align="center"><img src="https://assets.wuxinhua.com/blog/assets/posts/Step-2-1-Discord-Bot-Scope.png" width="800px" /></p>

<p align="center"><img src="https://assets.wuxinhua.com/blog/assets/posts/Step-2-2-Discord-Bot-Scope-Send-message.png" width="800px" /></p>

Copy the GENERATED URL from above, and paste it into your browser. You'll be guided through the installation flow, where you should make sure you're installing your app on a server where you can develop and test it.

<p align="center"><img src="https://assets.wuxinhua.com/blog/assets/posts/Step-2-2-Discord-Bot-Scope-URL-Authorize.png" width="800px" /></p>

<p align="center"><img src="https://assets.wuxinhua.com/blog/assets/posts/Step-2-3-Discord-Bot-Scope-URL.png" width="800px" /></p>

After authorized your app, you can head over to your server and see that -> GPT hopped into the server. ✨

## Step 3: Get a copy and Deploy

This guide uses [AirCode](https://aircode.io) to host code, Before we get a copy, make sure you have a AirCode account.

1. Go to this [Discord ChatGPT Bot Demo](https://aircode.cool/zsgdima57c). Click on the "Get a copy" button.
<p align="center"><img src="https://assets.wuxinhua.com/blog/assets/posts/Step-1-1-Discord-Bot-Get-a-copy.png" width="800px" /></p>

2. You'll be redirected to the Create app page, use the default name or type your own app name, then click "Create".

<p align="center"><img src="https://assets.wuxinhua.com/blog/assets/posts/Step-3-2-Discord-Bot-Create.png" width="800px" /></p>

Paste the Bot token、OpenAI Key、Public Key、Application ID、earlier save from platform into the Environment variables. Make sure they are in the right key value place.

<p align="center"><img src="https://assets.wuxinhua.com/blog/assets/posts/Step-3-3-Discord-Bot-Env.png" width="800px" /></p>

Click on the "Deploy" button to deploy all files, the env changes will take effect online after deployment.

<p align="center"><img src="https://assets.wuxinhua.com/blog/assets/posts/Step-3-4-Discord-Bot-Env-Deploy.png" width="800px" /></p>

## Step 4: Register Command

The project contains a register command script you can use to install the commands, which is defined in register-command.js. 

Select register-command.js file, you will find a invoke url as following, Copy the URL and paste it into your browser URL address.
<p align="center"><img src="https://assets.wuxinhua.com/blog/assets/posts/Step-4-1-Discord-Bot-Register-command.png" width="800px" /></p>

You will register /chatgpt slash command into server.

<p align="center"><img src="https://assets.wuxinhua.com/blog/assets/posts/Step-4-2-Discord-Bot-Register-command-ok.png" width="800px" /></p>

## Step 5: Handling Interactivity

To enable your app to receive slash command requests (and other interactions), Discord needs a public URL to send them.

Select interactions.js file, you will find a invoke URL as following, copy the link.

<p align="center"><img src="https://assets.wuxinhua.com/blog/assets/posts/Step-5-1-Discord-Bot-handing-interactivity.png" width="800px" /></p>

Back to Discord Applications, on your app's General Information page, there's an Interactive Endpoint URL option, where you can paste your interactions URL copied from AirCode.

<p align="center"><img src="https://assets.wuxinhua.com/blog/assets/posts/Step-5-2-Discord-Bot-handing-interactivity-URL.png" width="800px" /></p>

Make sure the save is successful.

<p align="center"><img src="https://assets.wuxinhua.com/blog/assets/posts/Step-5-3-Discord-Bot-handing-interactivity-URL-save.png" width="800px" /></p>

Test your ChatGPT bot by typing the command "/chatgpt".

<p align="center"><img src="https://assets.wuxinhua.com/blog/assets/posts/Step-5-3-Discord-Bot-handing-interactivity-test.png" width="800px" /></p>

## Feedback

Join our [Discord server](https://discord.com/invite/XrMVdYdEuY) for help and discussion.
