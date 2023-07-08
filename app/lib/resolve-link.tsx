const resolveLink = (link: string) => {
    switch (link.toLowerCase()) {
        case 'home':
            return '/';
        
        case 'rank poll':
            return '/polls';

        case 'sign in':
            return '/verify-email';
        
        case 'sign out':
            return '/signout';
    
        default:
            break;
    }

    return '/';
}

export default resolveLink;