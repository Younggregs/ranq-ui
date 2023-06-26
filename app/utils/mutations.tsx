import { gql } from 'urql';

const SIGNUP = gql`
   mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
        success,
        errors{
            message
        },
        user {
            id
        }
    }
    }
`;

const LOGIN = gql`
    mutation TokenAuth($email: String!, $password: String!) {
        tokenAuth(email: $email, password: $password) {
            token
            payload
            refreshExpiresIn
        }
    }
`;

const VERIFY_TOKEN = gql`
    mutation VerifyToken($token: String!) {
        verifyToken(token: $token) {
            payload
        }
}
`;

const CREATE_POLL = gql`
    mutation CreatePoll($title: String!, $description: String!, $contestants: [String!], $voters: [String!], $duration: String!, $durationS: Int!, $type: String!) {
        createPoll(title: $title, description: $description, contestants: $contestants, voters: $voters, duration: $duration, durationS: $durationS, type: $type) {
            poll{
                id,
                title,
                token
            }
        }
    }
`;

const CREATE_VOTE = gql`
     mutation CreateVote($id: String!, $ranked: [String!]) {
        createVote(id: $id, ranked: $ranked) {
            poll{
                id,
                title,
                token
            }
        }
    }
`;

const VERIFY_EMAIL = gql`
    mutation EmailVerification($email: String!, $type: String!) {
    emailVerification(email: $email, type: $type) {
        emailToken{
            email
        }
    }
    }
`;

const CREATE_VOTER = gql`
    mutation CreateVoter($token: String!, $email: String!) {
    createVoter(token: $token, email: $email) {
        voter{
            email
        }
    }
    }
`;

const RESET_PASSWORD = gql`
    mutation ResetPassword($token: String!, $password: String!) {
        resetPassword(token: $token, password: $password) {
            success,
            errors{
                message
            },
            user{
                email
            }
        }
    }
`;

export {
    SIGNUP,
    LOGIN,
    VERIFY_TOKEN,
    CREATE_POLL,
    CREATE_VOTE,
    VERIFY_EMAIL,
    CREATE_VOTER,
    RESET_PASSWORD
}