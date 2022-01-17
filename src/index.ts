const github = require('@actions/github')
const core = require('@actions/core')

const { owner, repo } = github.context.repo
const token = core.getInput('repo-token')
const octokit = token && github.getOctokit(token)

async function run() {
    console.log('------- Running comment action', token, octokit)

    if (!octokit) {
        core.warning('No octokit client')
        return
    }

    if (!github.context.payload.pull_request) {
        core.warning('Requires a pull request')
        return
    }

    console.log('------- Try posting comment')
    try {
        await octokit.pulls.createReviewComment({
            owner,
            repo,
            pull_number: github.context.payload.pull_request?.number,
            body: 'Hello world'
        })
    } catch (err) {
        core.error(err)
        throw err
    }
}

run()