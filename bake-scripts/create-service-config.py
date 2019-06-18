#! /usr/bin/env python
import json
import pipes
import sys
import os

def main(argv):
    raw = json.load(open(argv[1], "r"))

    os.makedirs("/etc/systemd/system/digital-paper-edit-infra.service.d", 755)
    f = open("/etc/systemd/system/digital-paper-edit-infra.service.d/env.conf", "w+")
    f.write("[Service]\n")
    for key, value in raw["configuration"].items():
        f.write("Environment=%s=%s\n" % (key, pipes.quote(value)))
    f.close()
    return 0

if __name__ == "__main__":
    sys.exit(main(sys.argv))
