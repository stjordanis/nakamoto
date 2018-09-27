from os.path import join, dirname
from os import remove, environ
from subprocess import Popen, TimeoutExpired

import lxml.etree as ET
from dotenv import load_dotenv
from clint.textui import colored


load_dotenv('.env')
ALIAS = environ.get("ALIAS")
assert isinstance(ALIAS, str), "Alias isn't string, check environment variables."
STORE_PASSWORD = environ.get("STORE_PASSWORD")
assert isinstance(STORE_PASSWORD, str), "Keystore password isn't string, \
    check environment variables."
KEYPASS = environ.get("KEYPASS")
assert isinstance(KEYPASS, str), "Keypass password isn't string, \
    check environment variables."
WINDOWS_USER = environ.get("WINDOWS_USER")
assert isinstance(WINDOWS_USER, str), "Windows user isn't string, \
    check environment variables."
folder = dirname(__file__)


def process(proc):
    """
    Communicates with process.
    """
    try:
        outs, errs = proc.communicate(timeout=2400)
    except TimeoutExpired:
        proc.kill()
        outs, errs = proc.communicate()
    return outs, errs


def remove_old_apk(name):
    """
    Deletes old apk.
    """
    try:
        remove(join(folder, 'outputs', name+'.apk'))
        print("Old apk removed.")
    except IOError:
        pass


def bundle():
    """
    Bundle apk.
    """
    proc = Popen("npm run bundle:prod", shell=True)
    outs, errs = process(proc=proc)
    if not errs is None:
        print(colored.red(errs))
    else:
        print(colored.green("Apk buindled."))

def build_apk():
    """
    Builds apk.
    """
    proc = Popen("cd C:\\Users\\{0}\\Desktop\\box\\nakamoto\\android && gradlew assembleRelease".format(WINDOWS_USER), shell=True)
    outs, errs = process(proc=proc)
    if not errs is None:
        print(colored.red(errs))
    else:
        print(colored.green("Apk built."))


def generate_apk_key():
    """
    Generates keystore.
    """

    proc = Popen('cd "C:\\Program Files\\Android\\Android Studio\\jre\\jre\\bin" && \
        .\\keytool.exe -genkey -v -keystore \
        C:\\Users\\{0}\\Desktop\\box\\nakamoto\\android\\app\\nakamoto.keystore \
        -alias {1} -keyalg RSA -keysize 2048 -validity 10000'.format(WINDOWS_USER, ALIAS), \
        shell=True)
    outs, errs = process(proc=proc)
    if not errs is None:
        print(colored.red(errs))
    else:
        print(colored.green("Key generated."))


def sign_apk():
    """
    Signs apk.
    """
    proc = Popen('"C:\\Program Files\\Android\\Android Studio\\jre\\bin\\jarsigner.exe" \
        -verbose -sigalg SHA1withRSA -digestalg SHA1 \
        -keystore C:\\Users\\{0}\\Desktop\\box\\nakamoto\\android\\app\\nakamoto.keystore \
        C:\\Users\\{0}\\Desktop\\box\\nakamoto\\android\\app\\build\\outputs\\apk\\release-unsigned.apk {1} \
        -keypass {2} -storepass {3}'.format(WINDOWS_USER, ALIAS, KEYPASS, STORE_PASSWORD), shell=True)
    outs, errs = process(proc=proc)
    if not errs is None:
        print(colored.red(errs))
    else:
        print(colored.green("Apk signed."))


def zipalign_apk(name):
    """
    Zipalgns apk.
    """
    proc = Popen("C:\\Users\\{0}\\AppData\\Local\\Android\\sdk\\build-tools\\27.0.3\\zipalign.exe \
        -v 4 C:\\Users\\{0}\\Desktop\\box\\nakamoto\\android\\app\\build\\outputs\\apk\\release-unsigned.apk \
        C:\\Users\\{0}\\Desktop\\box\\nakamoto\\outputs\{1}.apk".format(WINDOWS_USER, name), \
        shell=True)
    outs, errs = process(proc=proc)
    if not errs is None:
        print(colored.red(errs))
    else:
        print(colored.green("Apk zipaligned and ready to be uploaded to Google Play."))


def main():
    initial = False
    """
    Multi-apk builder.
    """
    projects = [
        { "name": "nakamoto" }
    ]

    for proj in projects:
        print(proj['name'])
        remove_old_apk(name=proj['name'])
        if initial:
            generate_apk_key()
        #bundle()
        build_apk()
        sign_apk()
        zipalign_apk(name=proj['name'])

main()
