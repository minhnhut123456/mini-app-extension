const nums = [2, 3, 4, 7]
const target = 7


const res =[]
const backtrack = (arr = [], sum = 0, start = 0) => {
  if(sum === target){
    res.push([...arr])
    return
  }

  if(sum > target){
    return
  }

  // const cur = nums[start]
  // arr.push(cur)
  // backtrack(arr, sum + cur, start)
  for(let i=start; i<nums.length; i++){
    const cur = nums[i]
    arr.push(cur)
    backtrack(arr, sum + cur, i)
    arr.pop()
  }
  
}

const res2 =[]
const backtrack2 = (arr = [], sum = 0, start = 0) => {
  if(sum === target){
    res2.push([...arr])
    return
  }

  if(sum > target){
    return
  }

  for(let i=start; i<nums.length; i++){
    if(i > start && nums[i] === nums[i-1]) continue
    const cur = nums[i]
    arr.push(cur)
    backtrack2(arr, sum + cur, i)
    arr.pop()
  }
}

const num = 8
const res3 = []
const backtrack3 = (arr = [], sum = 0, start = 0) => {
  if(sum === target){
    res3.push([...arr])
    return
  }

  if(sum > target){
    return
  }

  for(let i=start; i<nums.length; i++){
    if(i > start && nums[i] === nums[i-1]) continue
    const cur = nums[i]
    arr.push(cur)
    backtrack3(arr, sum + cur, i)
    arr.pop()
  }
}

const nums = [2, 3, 4, 7]

const permutation = () => {
  const res = []
  const used = Array.from({length: nums.length}, () => false)
  const sorted = nums.sort((a, b) => a - b)

  const backtrack = (arr=[]) => {
    if(arr.length === sorted.length){
      res.push([...arr])
      return
    }

    for(let i=0; i<sorted.length; i++){
      if(used[i]) continue
      if(i >0 && sorted[i] === sorted[i-1] && !used[i-1]) continue
      const cur = sorted[i]
      arr.push(cur)
      used[i] = true
      backtrack(arr)
      used[i] = false
      arr.pop()
    }
  }

  backtrack()
  return res
}

// if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue
// nghia là nếu đang dùng i-1 thì vẫn cần tiep i




// [1 1 1 2]
// [false false false false]

// [true false false false]
// [1]

// [true true false false]




// [ 1 2  3 3 3 3 3 5]
// [false false false false false false false false]



// [ 1 3 2 3 3 3 5 ]
// [true false false false false false false]


// 1 2


Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.

 

Example 1:

Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]
Example 2:

Input: s = "a"
Output: [["a"]]


[i][i] = 1
[i][j] = 0


const res = []
const dp = Array.from({length: s.length}, () => Array.from({length: s.length}, () => false))
for(let i=0; i<s.length; i++){
  dp[i][i] = true
  if(i < s.length - 1){
    dp[i][i+1] = s[i] === s[i+1]
  }
}

for(let i=s.length-1; i>=0; i--){
  for(let j=i+1; j<s.length; j++){
    if(s[i] === s[j]){
      dp[i][j] = dp[i+1][j-1]
    }
  }
}

const palinedrome = (start=0) => {
  const res = []

  const backtrack = (arr, start) => {
    if(start === s.length){
      res.push([...arr])
      return
    }

    for(let i=start; i<s.length; i++){
      const str = s.slice(start, i+1)
      if(checkPD(str)){
        arr.push(str)
        backtrack(arr, i+1)
        arr.pop()
      }
    }

  }
}




dp[i][j] = dp[i+1][j-1] && s[i] === s[j]


for (let i=s.length-1; i>=0; i--){
  for(let j=i+2; j<s.length; j++){
    dp[i][j] = dp[i+1][j-1] && s[i] === s[j]
  }
}


a[0] + a[1] === 0 || a[0] === a[1]
