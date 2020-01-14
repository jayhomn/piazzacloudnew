from piazza_api import Piazza
from html.parser import HTMLParser

# using this library to parse html tags in the content string
class MLStripper(HTMLParser):
    def __init__(self):
      super().__init__()
      self.reset()
      self.fed = []
    def handle_data(self, d):
        self.fed.append(d)
    def get_data(self):
        return ''.join(self.fed)

def strip_tags(html):
    s = MLStripper()
    s.feed(html)
    return s.get_data()

p = Piazza()
p.user_login("samuel.ip@alumni.ubc.ca", "59170864aS@")
#TODO UPON ASKING FOR USER CREDENTIALS, LOGIN TO THEIR PIAZZA ACCOUNT

stat200101 = p.network("jz1p1pgbr9e15c")
classes = p.get_user_classes()
print(classes)
print(stat200101)

# this gets the contents of a post: the question
tempPost = stat200101.get_post("361")
tempPostContent = tempPost["history"][0]["content"]
strippedQuestion = strip_tags(tempPostContent)
tempPostAns = tempPost["children"][0]["history"][0]["content"]
strippedAns = strip_tags(tempPostAns)

# go through all the posts, aggregate them in a datastructure
# store that in for easy access
postQuestions = []
postAnswers = []
postQuestions2 = {}
postAnswers2 = {}
# posts type is generator: cannot access memory in the lazy list
posts = stat200101.iter_all_posts(limit=10)
for post in posts:
  tempStr = strip_tags(post["history"][0]["content"])
  # postQuestions.append(tempStr)
  postQuestions2.update({post["id"]: tempStr})
  # print(postQuestions2)
  # checks if theres an answer associated to the question
  if "children" in post.keys() and post["children"]:
    tempStr2 = strip_tags(post["children"][0]["history"][0]["content"])
    # postAnswers.append(tempStr2)
    postAnswers2.update({post["id"]: tempStr2})
# print(len(postAnswers))
# TODO: instead of adding questions/answers to lists, add to dictionary objects and associate each question/answer with their ID
# each post has an id associated with it.
# print(postQuestions2)
# p.get_user_classes() returns list of dict of objects
studentClasses = []
for course in p.get_user_classes():
  studentClasses.append(course["nid"])
# print(studentClasses)