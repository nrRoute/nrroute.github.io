import sys, frontmatter, datetime, subprocess
from pathlib import Path

for name in sys.argv[1:]:
    path = Path(name)
    post = frontmatter.load(path)

    if post.get("created") < datetime.datetime.today().date():
        if not post.get("modified") or post.get("modified") < datetime.datetime.today().date():
            post["modified"] = datetime.datetime.today().date()
            text = frontmatter.dumps(post, sort_keys=False).rstrip("\n") + "\n"
            path.write_text(text, encoding="utf-8")
