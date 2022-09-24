import { hello_backend } from "../../declarations/hello_backend";

async function post(){
  let post_button = document.getElementById("post")
  let error = document.getElementById("error")
  error.innerText = ""
  post_button.disabled = true
  let textarea = document.getElementById("message")
  let otp = document.getElementById("otp").value
  let text = textarea.value
  try{
    await hello_backend.post(otp,text)
    textarea.value = ""
  }catch(err){
    console.log(err)
    error.innerText = "post fail"
  }
  post_button.disabled = false
}

var num_posts=0
var num_follows=0
var timeline = []

async function load_posts(){
  let posts_section = document.getElementById("posts")
  let posts = await hello_backend.posts(0)
  if (num_posts == posts.length) return
  num_posts = posts.length
  posts_section.replaceChildren([])
  for ( var i=0;i<posts.length;i++){
    let post = document.createElement("p")
    post.innerText = posts[i]['text']
    posts_section.appendChild(post)
  }
}

function show_posts(author_name){
  let follow_post = document.getElementById("follow_post")
  let current_name = follow_post.getAttribute("author")
  if(current_name == author_name) return
  follow_post.setAttribute("author",author_name)
  follow_post.replaceChildren([])
  let author_post = []
  for (var i=0;i<timeline.length;i++){
    if(timeline[i]['author'] == author_name) author_post.push(timeline[i])
  }
  console.log(author_post)
  for (var i=0;i<author_post.length;i++){
    let one_post = document.createElement("p")
    let post_time = new Date(Math.floor(Number(author_post[i]['time'])) / 1000000).toLocaleString()
    one_post.innerText = post_time + "   " + author_post[i]['text']
    follow_post.appendChild(one_post)
  }
}

async function load_follows(){
  let follow_section = document.getElementById("follows")
  let follow_name = await hello_backend.follows_name()
  if (num_follows == follow_name.length) return
  num_follows = follow_name.length
  follow_section.replaceChildren([])
  for ( var i=0;i<follow_name.length;i++){
    let one_follow = document.createElement("p")
    one_follow.innerText = follow_name[i][0]
    one_follow.onclick = function(){
      console.log("onclick")
      show_posts(one_follow.innerText)
    }
    follow_section.appendChild(one_follow)
  }
}

async function load_timeline(){
  let all_msg = await hello_backend.timeline(0)
  if (timeline.length == all_msg.length) return
  timeline = all_msg
  console.log(timeline)
}

function load(){
  let post_button = document.getElementById("post")
  post_button.onclick = post;
  load_posts()
  setInterval(load_posts,3000)
  load_follows()
  setInterval(load_follows,4000)
  load_timeline()
  setInterval(load_timeline,3000)
}

window.onload = load