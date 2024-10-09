function getVoteCount(votes) {
    return votes.upvotes - votes.downvotes;
}

console.log(getVoteCount({ upvotes: 10, downvotes: 5 }));  
console.log(getVoteCount({ upvotes: 7, downvotes: 3 }));   
console.log(getVoteCount({ upvotes: 0, downvotes: 0 }));    
console.log(getVoteCount({ upvotes: 5, downvotes: 10 }));   