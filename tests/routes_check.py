import sys,unittest,tempfile
from unittest.mock import patch
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
import build
class Routes(unittest.TestCase):
 def test_validation(self):
  for raw in [dict(link=[{'from':'missing','to':'b','role':'required','at':'test'}]),dict(link=[{'from':'a','to':'b','role':'required','at':'x'},{'from':'b','to':'a','role':'required','at':'y'}]),dict(route=[{'id':'x','title':'X','destination':'missing'}]),dict(link=[{'from':'a','to':'b','role':'wrong','at':'x'}])]:
   p=build.Problems();build.compile_routes(raw,{'a':{},'b':{}},{},p);self.assertGreater(p.errors,0)
 def test_prereqs_and_roles(self):
  p=build.Problems();r=build.compile_routes({'link':[{'from':'b','to':'a','role':'optional','at':'alternative'}]}, {'a':{},'b':{}},{'b':{'prereqs':['a']}},p)
  self.assertEqual(p.errors,0);self.assertEqual(len(r['links']),2)
 def test_provenance(self):
  for s in [{'review':'certain'},{'kind':'blog'},{'locator':''}]:
   p=build.Problems();build.validate_source(s,'test',p);self.assertGreater(p.errors,0)
 def test_result_requirements_and_malformed_sources(self):
  with tempfile.TemporaryDirectory() as folder, patch.object(build,'ROOT',Path(folder)):
   path=Path(folder)/'r.md'
   site={'stations':{'r':{'kind':'result','folder':path.parent.name}},'presets':{}}
   for sources in ['[]','["malformed"]']:
    path.write_text('+++\nsummary="test"\ntime="continuous"\nsources='+sources+'\n+++\n## Card\n### Statement {#statement}\nA statement.\n',encoding='utf-8')
    p=build.Problems();build.compile_entry(path,site,p);self.assertGreater(p.errors,0)
if __name__=='__main__':unittest.main()
