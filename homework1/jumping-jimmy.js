function jumpingJimmy(tower, jumpHeight) {
    let maxJumpHeight = 0;
    for(let floorHeight of tower) {
        if(floorHeight > jumpHeight) return maxJumpHeight;
        maxJumpHeight += floorHeight;
    }
    return maxJumpHeight;
}

function main() {
    let tower = [3, 1, 2];
    console.log(jumpingJimmy(tower, 3));
    tower = [1, 2, 3, 4];
    console.log(jumpingJimmy(tower, 2));
    tower = [5, 1, 8, 2, 4, 3, 1, 9, 8, 5, 1];
    console.log(jumpingJimmy(tower, 1));
}

main();