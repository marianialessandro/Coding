/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
    var dfs = (i, j, grid, visited, count) =>{
        var issafe = (i, j, grid, visited) =>{
            if(
                (i >= 0 && i<grid.length) && 
                (j >= 0 && j<grid[0].length) && grid[i][j] == 1 && visited[i][j]==0){
                return true;
            }
        
            return false;
        }

        var m=i;
        var n=j;

        visited[i][j]=1;

        //for upper
        if(issafe(m+1,n,grid,visited)){
            count+=1;
            count=dfs(m+1,n,grid,visited,count);
        }
        //for down
        if(issafe(m-1,n,grid,visited)){
            count+=1;
            count=dfs(m-1,n,grid,visited,count);
        }

        //for right
        if(issafe(m,n+1,grid,visited)){
            count+=1;
            count=dfs(m,n+1,grid,visited,count);
        } 

        //for left
        if(issafe(m,n-1,grid,visited)){
            count+=1;
            count=dfs(m,n-1,grid,visited,count);
        }

        return count;
    }

    var visited = [];

    for (var i = 0; i < grid.length; i++){

        visited.push([]);

        for (var j = 0; j < grid[i].length; j++){
            visited[i].push(0);
        }
    }

    var max = 0;

    for (var i = 0; i < grid.length; i++){
        for (var j = 0; j < grid[i].length; j++){
            if (visited[i][j] == 0 && grid[i][j] == 1){
                max = Math.max(dfs(i,j, grid, visited, 1), max);
            }
        }
    }

    return max;
};