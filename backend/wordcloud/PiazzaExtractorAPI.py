from piazza_api import Piazza
from html.parser import HTMLParser

# usage note, function piazza_reader only works if the coursecode entered is exact
# TODO make the coursecode parameter smarter

# limit for the iter_all_posts function
const_limit = 30


# using this library to parse html tags in the content string
# ignore this area for now
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
# html tag stripper area^


def login(email, password):
    piazza = Piazza()
    piazza.user_login(email, password)
    class_dictionary = piazza.get_user_classes()
    return class_dictionary

    courseToHash = {}
    #print(len(class_dictionary))
    for i in range(len(class_dictionary)):
        courseToHash.update({class_dictionary[i]['num']: class_dictionary[i]['nid']})


# RETURNS: list of string of comments and posts
def piazza_reader(email, password, coursecode):
    # User credentials
    piazza = Piazza()
    # Login
    piazza.user_login(email, password)

    class_dictionary = piazza.get_user_classes()

    # dictionary for 'course code: hash_id'
    coursetohash = {}
    # print(len(class_dictionary))
    for i in range(len(class_dictionary)):
        coursetohash.update({class_dictionary[i]['num']: class_dictionary[i]['nid']})

    print(coursetohash)

    classroom = piazza.network(coursetohash[coursecode])

    # print(coursecode)
    # print(coursetohash[coursecode])

    # go through all the posts, aggregate them in a data-structure
    postquestions = []
    postanswers = []

    # board_posts type is generator: cannot access memory in the lazy list
    board_posts = classroom.iter_all_posts(limit=const_limit)

    # iterate through board posts
    for post in board_posts:
        # get rid of html tags in question in post
        question_string = strip_tags(post["history"][0]["content"])

        # append to questions array
        postquestions.append(question_string)

        # checks if there's an answer associated to the question
        if "children" in post.keys() and post["children"] and "history" in post["children"][0]:

            # for all answers in a single post (iterate)
            for answer_index in range(len(post["children"][0]["history"])):

                # get rid of html tags for answers in the post, and check if the entry is a string
                if type(post["children"][0]["history"][answer_index]["content"]) == str:
                    answer_string = strip_tags(post["children"][0]["history"][answer_index]["content"])

                    # append to answers array
                    postanswers.append(answer_string)

    # print(postQuestions + postAnswers)
    return " ".join(postquestions + postanswers)