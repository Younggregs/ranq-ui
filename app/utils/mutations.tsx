import { gql } from 'urql';

const SIGNUP = gql`
   mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
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
    mutation CreatePoll($title: String!, $description: String!, $contestants: [String!], $voters: [String!], $duration: String!, $type: String!) {
        createPoll(title: $title, description: $description, contestants: $contestants, voters: $voters, duration: $duration, type: $type) {
            poll{
                title,
                description
            }
        }
    }
`;

export {
    SIGNUP,
    LOGIN,
    VERIFY_TOKEN,
    CREATE_POLL
}