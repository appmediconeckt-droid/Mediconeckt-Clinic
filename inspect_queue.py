from pathlib import Path
p = Path(r'c:\Users\ArunBAarode\Desktop\mediconeckt-frontend\Mediconeckt-Clinic\src\components\DoctorDashboard\Dashboard\DoctorDashboard.jsx')
text = p.read_text(encoding='utf-8', errors='replace')
start = text.find('              <div className="table-responsive">')
print('start', start)
print(repr(text[start:start+500]))
