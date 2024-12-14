function sum(a,b) {
  return ()=>{
    console.log(arguments)
  }
}

function test(x,y) {
  sum(3,4)()
}

test(1,2)