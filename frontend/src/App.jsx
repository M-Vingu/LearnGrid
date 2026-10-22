import { useMemo, useState } from 'react'
import './App.css'

const initialCourses = [
  { title: 'Product design', category: 'Design', teacher: 'Amina Yusuf', progress: 72, lessons: '18 / 24 lessons', color: 'lavender', mark: '✳', next: 'Design systems that scale' },
  { title: 'Modern mathematics', category: 'Mathematics', teacher: 'David Kimani', progress: 48, lessons: '12 / 25 lessons', color: 'peach', mark: '∑', next: 'Functions & graphs' },
  { title: 'Introduction to biology', category: 'Science', teacher: 'Grace Mwangi', progress: 35, lessons: '7 / 20 lessons', color: 'mint', mark: '⌬', next: 'Inside the cell' },
]

const roleData = {
  Student: {
    name: 'Maya', title: 'Student workspace', initials: 'MK',
    nav: [['Overview', 'grid'], ['My courses', 'book'], ['Study planner', 'calendar'], ['Assignments', 'check']],
  },
  Teacher: {
    name: 'Amina', title: 'Teacher workspace', initials: 'AY',
    nav: [['Overview', 'grid'], ['My classes', 'users'], ['Assignments', 'check'], ['Students', 'graduation']],
  },
  Admin: {
    name: 'Alex', title: 'Administrator workspace', initials: 'AD',
    nav: [['Overview', 'grid'], ['Users', 'users'], ['Courses', 'book'], ['Analytics', 'chart']],
  },
}

const iconPaths = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
  book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 5.5v16M8 7h8M8 11h8"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h2M14 14h2M8 17h2"/></>,
  check: <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h3M8 16l1.5 1.5L13 14"/></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  graduation: <><path d="m2 10 10-6 10 6-10 6z"/><path d="M6 12.5v5c2.5 2 9.5 2 12 0v-5M22 10v6"/></>,
  chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></>,
  search: <><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
  plus: <path d="M12 5v14M5 12h14"/>,
  more: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  play: <path d="m9 6 10 6-10 6z"/>,
  spark: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></>,
  close: <><path d="m18 6-12 12M6 6l12 12"/></>,
}

function Icon({ name, size = 20, className = '' }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>
}

function CourseCard({ course, onContinue }) {
  return <article className="course-card">
    <div className={`course-art ${course.color}`}><span className="course-symbol">{course.mark}</span><span className="art-label">{course.category}</span></div>
    <div className="course-card-body">
      <div className="course-card-heading"><div><span className="eyebrow">{course.category}</span><h3>{course.title}</h3></div><button className="icon-button subtle" aria-label={`More options for ${course.title}`}><Icon name="more"/></button></div>
      <p className="course-teacher">with {course.teacher}</p>
      <div className="course-progress-label"><span>{course.lessons}</span><span>{course.progress}%</span></div>
      <div className="progress-bar"><span style={{ width: `${course.progress}%` }}/></div>
      <button className="text-action" onClick={() => onContinue(course)}>{course.next}<Icon name="arrow" size={17}/></button>
    </div>
  </article>
}

function WeekChart({ role }) {
  const values = role === 'Student' ? [38, 60, 46, 82, 52, 72, 30] : [42, 64, 56, 80, 68, 91, 45]
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return <div className="week-chart">
    <div className="chart-y-labels"><span>4h</span><span>3h</span><span>2h</span><span>1h</span><span>0</span></div>
    <div className="chart-area"><div className="chart-grid"><i/><i/><i/><i/><i/></div><div className="chart-bars">{values.map((value, i) => <div className="chart-bar-column" key={labels[i]}><div className={`chart-bar ${i === 3 ? 'highlight' : ''}`} style={{ height: `${value}%` }} title={`${Math.round(value * 0.04 * 10) / 10} hours`}/><span>{labels[i]}</span></div>)}</div></div>
  </div>
}

function App() {
  const [role, setRole] = useState('Student')
  const [section, setSection] = useState('Overview')
  const [courses, setCourses] = useState(initialCourses)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)
  const [toast, setToast] = useState('')
  const [selectedDay, setSelectedDay] = useState('Today')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const user = roleData[role]
  const filteredCourses = useMemo(() => courses.filter((course) => `${course.title} ${course.category} ${course.teacher}`.toLowerCase().includes(search.toLowerCase())), [courses, search])
  const showToast = (message) => { setToast(message); window.setTimeout(() => setToast(''), 2600) }

  function changeRole(nextRole) {
    setRole(nextRole)
    setSection('Overview')
    setSearch('')
    setMobileNavOpen(false)
  }

  function handleActionSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const title = String(form.get('title') || '').trim()
    if (!title) return
    if (modal?.type === 'course') {
      setCourses((current) => [...current, { title, category: String(form.get('category') || 'New course'), teacher: roleData[role].name, progress: 0, lessons: '0 / 12 lessons', color: ['lavender', 'peach', 'mint'][current.length % 3], mark: '✦', next: 'Start learning' }])
      showToast('Course added to your workspace')
    } else if (modal?.type === 'assignment') {
      showToast(`“${title}” has been created`)
    } else {
      showToast(`“${title}” added successfully`)
    }
    setModal(null)
  }

  function setPage(nextSection) {
    setSection(nextSection)
    setSearch('')
    setMobileNavOpen(false)
  }

  const actionLabel = role === 'Student' ? (section === 'Study planner' ? 'Plan a study session' : 'Explore courses') : role === 'Teacher' ? (section === 'Assignments' ? 'Create assignment' : 'Create a course') : section === 'Users' ? 'Invite a user' : 'Add a course'

  return <div className="app-shell">
    <aside className={`sidebar ${mobileNavOpen ? 'open' : ''}`}>
      <div className="brand-row"><div className="brand-mark"><span/><span/><span/><span/></div><span className="brand-name">learn<span>grid</span></span><button className="icon-button sidebar-close" onClick={() => setMobileNavOpen(false)} aria-label="Close menu"><Icon name="close"/></button></div>
      <div className="workspace-label">WORKSPACE</div>
      <div className="role-switcher" aria-label="Choose dashboard role">
        {['Student', 'Teacher', 'Admin'].map((item) => <button key={item} className={role === item ? 'active' : ''} onClick={() => changeRole(item)}>{item}</button>)}
      </div>
      <div className="side-section-label">MENU</div>
      <nav className="main-nav" aria-label={`${role} navigation`}>
        {user.nav.map(([label, icon]) => <button key={label} className={`nav-link ${section === label ? 'active' : ''}`} onClick={() => setPage(label)}><Icon name={icon}/><span>{label}</span>{label === 'Assignments' && role !== 'Admin' && <span className="nav-count">3</span>}</button>)}
      </nav>
      <div className="sidebar-spacer"/>
      <div className="sidebar-help"><div className="help-orb"><Icon name="spark" size={20}/></div><strong>Need a hand?</strong><p>Visit our help center to get unstuck.</p><button onClick={() => showToast('Help center is coming soon')}>Get support <Icon name="arrow" size={15}/></button></div>
      <button className="profile-card" onClick={() => showToast(`${user.name}’s profile settings`)}><div className={`avatar ${role.toLowerCase()}`}>{user.initials}</div><div className="profile-meta"><strong>{user.name} {role === 'Student' ? 'Kamau' : role === 'Teacher' ? 'Yusuf' : 'Davis'}</strong><span>{role === 'Admin' ? 'Administrator' : role}</span></div><Icon name="more" size={19}/></button>
    </aside>
    {mobileNavOpen && <button className="mobile-scrim" onClick={() => setMobileNavOpen(false)} aria-label="Close navigation"/>}

    <main className="main-content">
      <header className="topbar">
        <div className="breadcrumbs"><button className="mobile-menu icon-button" onClick={() => setMobileNavOpen(true)} aria-label="Open menu"><span className="hamburger"/></button><span className="breadcrumb-muted">Workspace</span><span className="breadcrumb-slash">/</span><span>{section}</span></div>
        <div className="topbar-actions"><label className="search-box"><Icon name="search" size={18}/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search anything..." aria-label="Search"/><kbd>⌘ K</kbd></label><button className="icon-button notification-button" onClick={() => showToast('You’re all caught up')} aria-label="Notifications"><Icon name="bell"/><i/></button><div className={`avatar top-avatar ${role.toLowerCase()}`}>{user.initials}</div></div>
      </header>

      <div className="page-wrap">
        {section === 'Overview' && <>
          <section className="welcome-row"><div><div className="date-line"><span className="date-dot"/> WEDNESDAY, OCTOBER 22, 2026</div><h1>{role === 'Student' ? 'Good morning, Maya' : role === 'Teacher' ? 'Welcome back, Amina' : 'Good morning, Alex'} <span className="wave">{role === 'Student' ? '✦' : '✦'}</span></h1><p className="page-intro">{role === 'Student' ? 'A little progress each day adds up to big results.' : role === 'Teacher' ? 'Here’s what’s happening with your classes today.' : 'Here’s a snapshot of your learning community.'}</p></div><button className="primary-button" onClick={() => role === 'Student' ? setPage('My courses') : setModal({ type: role === 'Admin' ? 'course' : 'course', title: role === 'Admin' ? 'Add a course' : 'Create a course' })}>{role === 'Student' ? 'Browse courses' : 'Create a course'}<Icon name={role === 'Student' ? 'arrow' : 'plus'} size={17}/></button></section>

          {role === 'Student' && <>
            <section className="hero-banner"><div className="hero-copy"><span className="hero-kicker"><Icon name="spark" size={15}/> YOUR LEARNING JOURNEY</span><h2>You’re building<br/>great momentum.</h2><p>You’ve learned for <strong>4 days in a row.</strong> Keep your streak alive!</p><button onClick={() => setPage('Study planner')}>See your study plan <Icon name="arrow" size={17}/></button></div><div className="hero-art"><div className="hero-sun"/><div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/><div className="hero-plant plant-left"><i/><i/><i/><b/></div><div className="hero-plant plant-right"><i/><i/><i/><b/></div><div className="hero-book book-back"/><div className="hero-book book-front"><span/><span/><span/></div><div className="hero-star star-one">✦</div><div className="hero-star star-two">✳</div></div><div className="banner-decoration"/></section>
            <section className="stats-grid"><article className="stat-card"><div className="stat-top"><span>Learning hours</span><span className="stat-icon indigo"><Icon name="clock" size={18}/></span></div><div className="stat-value">18.5 <small>hrs</small></div><div className="stat-foot"><span className="trend-up">↗ 12%</span> <span>vs. last month</span></div></article><article className="stat-card"><div className="stat-top"><span>Courses in progress</span><span className="stat-icon peach-icon"><Icon name="book" size={18}/></span></div><div className="stat-value">06</div><div className="stat-foot">You’re on a roll <span className="mini-emoji">✦</span></div></article><article className="stat-card"><div className="stat-top"><span>Lessons completed</span><span className="stat-icon green-icon"><Icon name="check" size={18}/></span></div><div className="stat-value">32 <small>of 48</small></div><div className="stat-foot"><div className="mini-progress"><span/></div><span>67% complete</span></div></article><article className="stat-card streak-card"><div className="stat-top"><span>Current streak</span><span className="stat-icon yellow-icon">✳</span></div><div className="stat-value">04 <small>days</small></div><div className="streak-week">{['M','T','W','T','F','S','S'].map((day, i) => <span key={i} className={i < 4 ? 'done' : ''}>{i < 4 ? '✓' : day}</span>)}</div></article></section>
          </>}

          {role === 'Teacher' && <section className="stats-grid role-stats"><article className="stat-card"><div className="stat-top"><span>Active students</span><span className="stat-icon indigo"><Icon name="graduation" size={18}/></span></div><div className="stat-value">284</div><div className="stat-foot"><span className="trend-up">↗ 8.4%</span> <span>this semester</span></div></article><article className="stat-card"><div className="stat-top"><span>My classes</span><span className="stat-icon peach-icon"><Icon name="book" size={18}/></span></div><div className="stat-value">08</div><div className="stat-foot">Across 3 subjects</div></article><article className="stat-card"><div className="stat-top"><span>Assignments to review</span><span className="stat-icon yellow-icon"><Icon name="check" size={18}/></span></div><div className="stat-value">12</div><div className="stat-foot">4 due for feedback today</div></article><article className="stat-card"><div className="stat-top"><span>Average engagement</span><span className="stat-icon green-icon"><Icon name="chart" size={18}/></span></div><div className="stat-value">86<small>%</small></div><div className="stat-foot"><span className="trend-up">↗ 3.2%</span> <span>vs. last month</span></div></article></section>}

          {role === 'Admin' && <section className="stats-grid role-stats"><article className="stat-card"><div className="stat-top"><span>Total learners</span><span className="stat-icon indigo"><Icon name="graduation" size={18}/></span></div><div className="stat-value">2,840</div><div className="stat-foot"><span className="trend-up">↗ 12.8%</span> <span>this month</span></div></article><article className="stat-card"><div className="stat-top"><span>Active teachers</span><span className="stat-icon peach-icon"><Icon name="users" size={18}/></span></div><div className="stat-value">164</div><div className="stat-foot">Across 24 departments</div></article><article className="stat-card"><div className="stat-top"><span>Published courses</span><span className="stat-icon green-icon"><Icon name="book" size={18}/></span></div><div className="stat-value">96</div><div className="stat-foot">8 awaiting review</div></article><article className="stat-card"><div className="stat-top"><span>Platform engagement</span><span className="stat-icon yellow-icon"><Icon name="chart" size={18}/></span></div><div className="stat-value">78<small>%</small></div><div className="stat-foot"><span className="trend-up">↗ 4.6%</span> <span>vs. last month</span></div></article></section>}

          <section className="dashboard-grid"><article className="panel activity-panel"><div className="panel-heading"><div><span className="eyebrow">YOUR OVERVIEW</span><h2>{role === 'Student' ? 'Learning activity' : role === 'Teacher' ? 'Class engagement' : 'Platform activity'}</h2></div><button className="select-button" onClick={() => showToast('Showing activity for this week')}>This week <span className="chevron">⌄</span></button></div><div className="activity-summary"><strong>{role === 'Student' ? '12.5 hours' : role === 'Teacher' ? '86% average' : '78% active'}</strong><span className="trend-up">↗ 16.2%</span><span className="muted">compared to last week</span></div><WeekChart role={role}/></article>
            <article className="panel schedule-panel"><div className="panel-heading"><div><span className="eyebrow">UP NEXT</span><h2>{role === 'Student' ? 'Today’s plan' : role === 'Teacher' ? 'Today’s schedule' : 'Needs attention'}</h2></div><button className="icon-button subtle" onClick={() => setPage(role === 'Student' ? 'Study planner' : role === 'Teacher' ? 'My classes' : 'Courses')} aria-label="View all"><Icon name="arrow" size={18}/></button></div>
              {role === 'Admin' ? <div className="attention-list"><div className="attention-item"><span className="attention-badge purple">08</span><div><strong>Courses awaiting review</strong><span>Submitted by teachers</span></div><Icon name="arrow" size={16}/></div><div className="attention-item"><span className="attention-badge amber">04</span><div><strong>New teacher requests</strong><span>Accounts need approval</span></div><Icon name="arrow" size={16}/></div><div className="attention-item"><span className="attention-badge mint">12</span><div><strong>Support tickets</strong><span>3 marked as urgent</span></div><Icon name="arrow" size={16}/></div></div> : <div className="timeline"><div className="timeline-item"><span className="timeline-time">09:30</span><span className="timeline-line purple-line"/><div><strong>{role === 'Student' ? 'Product design' : 'Year 10 · Mathematics'}</strong><span>{role === 'Student' ? 'Lesson 19 · Design systems' : 'Room 204 · 24 students'}</span></div><button onClick={() => showToast(role === 'Student' ? 'Lesson opened' : 'Classroom opened')} aria-label="Open"><Icon name="arrow" size={16}/></button></div><div className="timeline-item"><span className="timeline-time">11:00</span><span className="timeline-line orange-line"/><div><strong>{role === 'Student' ? 'Modern mathematics' : 'Year 12 · Biology'}</strong><span>{role === 'Student' ? 'Practice · Functions & graphs' : 'Lab 3 · 18 students'}</span></div><button onClick={() => showToast(role === 'Student' ? 'Practice opened' : 'Classroom opened')} aria-label="Open"><Icon name="arrow" size={16}/></button></div><div className="timeline-item"><span className="timeline-time">14:30</span><span className="timeline-line green-line"/><div><strong>{role === 'Student' ? 'Introduction to biology' : 'Planning time'}</strong><span>{role === 'Student' ? 'Lesson 8 · Inside the cell' : 'Department meeting · Staff room'}</span></div><button onClick={() => showToast(role === 'Student' ? 'Lesson opened' : 'Event details opened')} aria-label="Open"><Icon name="arrow" size={16}/></button></div></div>}
            </article></section>

          {role === 'Student' && <section className="courses-section"><div className="section-heading"><div><span className="eyebrow">PICK UP WHERE YOU LEFT OFF</span><h2>Your courses</h2></div><button className="link-button" onClick={() => setPage('My courses')}>View all courses <Icon name="arrow" size={17}/></button></div><div className="course-grid">{courses.slice(0, 3).map((course) => <CourseCard key={course.title} course={course} onContinue={(item) => setModal({ type: 'lesson', title: item.next, course: item.title })}/>)}</div></section>}
          {role === 'Teacher' && <section className="courses-section"><div className="section-heading"><div><span className="eyebrow">YOUR CLASSROOMS</span><h2>Classes at a glance</h2></div><button className="link-button" onClick={() => setPage('My classes')}>View all classes <Icon name="arrow" size={17}/></button></div><ClassList onOpen={(name) => showToast(`${name} classroom opened`)}/></section>}
          {role === 'Admin' && <section className="courses-section"><div className="section-heading"><div><span className="eyebrow">YOUR COMMUNITY</span><h2>Recently joined</h2></div><button className="link-button" onClick={() => setPage('Users')}>Manage users <Icon name="arrow" size={17}/></button></div><PeopleTable role="Admin"/></section>}
        </>}

        {section !== 'Overview' && <SubPage role={role} section={section} courses={filteredCourses} search={search} selectedDay={selectedDay} setSelectedDay={setSelectedDay} onAction={() => setModal({ type: section === 'Assignments' ? 'assignment' : section === 'Study planner' ? 'session' : section === 'Users' ? 'user' : 'course', title: actionLabel })} onCourse={(course) => setModal({ type: 'lesson', title: course.next, course: course.title })} onToast={showToast}/>}
        <footer className="footer"><span>© 2026 LearnGrid</span><div><button onClick={() => showToast('Help center is coming soon')}>Help center</button><span>·</span><button onClick={() => showToast('Privacy policy is coming soon')}>Privacy</button><span>·</span><span>Made for curious minds <b>✦</b></span></div></footer>
      </div>
    </main>

    {modal && <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setModal(null) }}><section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close icon-button" onClick={() => setModal(null)} aria-label="Close"><Icon name="close"/></button>{modal.type === 'lesson' ? <><span className="modal-icon"><Icon name="play"/></span><span className="eyebrow">CONTINUE LEARNING</span><h2 id="modal-title">{modal.title}</h2><p className="modal-description">Ready to pick up where you left off in <strong>{modal.course}</strong>? Your progress is saved.</p><div className="lesson-preview"><span className="lesson-play"><Icon name="play" size={18}/></span><div><strong>{modal.course}</strong><span>Lesson · About 12 minutes</span></div><Icon name="clock" size={17}/></div><button className="primary-button modal-submit" onClick={() => { setModal(null); showToast('Lesson started — happy learning!') }}>Start lesson <Icon name="arrow" size={17}/></button></> : <><span className="modal-icon"><Icon name="plus"/></span><span className="eyebrow">WORKSPACE</span><h2 id="modal-title">{modal.title}</h2><p className="modal-description">Add details below to get started.</p><form onSubmit={handleActionSubmit}><label className="form-label">Name or title<input name="title" autoFocus placeholder={modal.type === 'user' ? 'e.g. Jordan Lee' : modal.type === 'session' ? 'e.g. Review chapter 4' : modal.type === 'assignment' ? 'e.g. Week 4 reflection' : 'e.g. Creative writing'} required/></label>{(modal.type === 'course') && <label className="form-label">Category<select name="category"><option>Design</option><option>Mathematics</option><option>Science</option><option>Languages</option><option>Business</option></select></label>}{(modal.type === 'assignment' || modal.type === 'session') && <label className="form-label">Due date<input type="date" name="date"/></label>}<button className="primary-button modal-submit" type="submit">Create <Icon name="arrow" size={17}/></button></form></>}</section></div>}
    {toast && <div className="toast"><span>✓</span>{toast}</div>}
  </div>
}

function ClassList({ onOpen }) {
  const classes = [
    { name: 'Year 10 · Mathematics', detail: 'Algebra & functions', students: '24 students', progress: 76, color: 'lavender', initials: 'Y10' },
    { name: 'Year 12 · Biology', detail: 'Cellular biology', students: '18 students', progress: 62, color: 'mint', initials: 'Y12' },
    { name: 'Year 9 · Design', detail: 'Introduction to design', students: '31 students', progress: 84, color: 'peach', initials: 'Y9' },
  ]
  return <div className="class-list">{classes.map((item) => <button className="class-row" key={item.name} onClick={() => onOpen(item.name)}><span className={`class-mark ${item.color}`}>{item.initials}</span><span className="class-name"><strong>{item.name}</strong><small>{item.detail}</small></span><span className="class-students"><Icon name="users" size={16}/>{item.students}</span><span className="class-progress"><span>{item.progress}% complete</span><i><b style={{ width: `${item.progress}%` }}/></i></span><span className="class-arrow"><Icon name="arrow" size={17}/></span></button>)}</div>
}

function PeopleTable({ role }) {
  const people = role === 'Admin' ? [['JM', 'Jordan Mwangi', 'jordan.m@example.com', 'Student', 'Oct 21, 2026'], ['SW', 'Sarah Wanjiku', 'sarah.w@example.com', 'Teacher', 'Oct 20, 2026'], ['DO', 'Daniel Otieno', 'daniel.o@example.com', 'Student', 'Oct 19, 2026'], ['AK', 'Aisha Kamau', 'aisha.k@example.com', 'Student', 'Oct 18, 2026']] : [['BM', 'Brian Mutua', 'Year 10 · Mathematics', '76%', 'On track'], ['LW', 'Lily Wambui', 'Year 10 · Mathematics', '52%', 'Needs help'], ['PO', 'Peter Ochieng', 'Year 10 · Mathematics', '91%', 'On track'], ['NW', 'Nia Wairimu', 'Year 10 · Mathematics', '34%', 'Needs help']]
  return <div className="table-wrap"><table><thead><tr>{(role === 'Admin' ? ['USER', 'EMAIL', 'ROLE', 'JOINED'] : ['STUDENT', 'CLASS', 'PROGRESS', 'STATUS']).map((header) => <th key={header}>{header}</th>)}<th/></tr></thead><tbody>{people.map(([initials, name, detail, status, extra]) => <tr key={name}><td><span className="table-person"><span className="tiny-avatar">{initials}</span><strong>{name}</strong></span></td><td>{detail}</td><td>{role === 'Admin' ? <span className={`role-chip ${status.toLowerCase()}`}>{status}</span> : status}</td><td>{extra}</td><td><button className="icon-button subtle" aria-label={`More about ${name}`}><Icon name="more" size={18}/></button></td></tr>)}</tbody></table></div>
}

function SubPage({ role, section, courses, search, selectedDay, setSelectedDay, onAction, onCourse, onToast }) {
  const titleMap = { 'My courses': 'My courses', 'Study planner': 'Study planner', Assignments: 'Assignments', 'My classes': 'My classes', Students: 'My students', Users: 'User management', Courses: 'Course management', Analytics: 'Platform analytics' }
  const descriptionMap = { 'My courses': 'All your learning, neatly in one place.', 'Study planner': 'Make time for the things you want to learn.', Assignments: role === 'Student' ? 'Stay on top of your work and upcoming deadlines.' : 'Create, share, and review student work.', 'My classes': 'Your classrooms, progress, and student activity.', Students: 'Follow student progress and celebrate their wins.', Users: 'Manage the people who make LearnGrid a community.', Courses: 'Manage courses across the platform.', Analytics: 'A closer look at learning across your platform.' }
  const heading = titleMap[section] || section
  return <section className="subpage"><div className="subpage-heading"><div><div className="date-line"><span className="date-dot"/> {role.toUpperCase()} WORKSPACE</div><h1>{heading}</h1><p className="page-intro">{descriptionMap[section] || 'Everything you need, all in one place.'}</p></div><button className="primary-button" onClick={() => section === 'My courses' && role === 'Student' ? onToast('Course catalog opened') : onAction()}><Icon name={section === 'Assignments' && role === 'Student' || section === 'Analytics' || section === 'Students' ? 'arrow' : 'plus'} size={17}/>{section === 'Assignments' && role === 'Student' ? 'Submit work' : section === 'My courses' && role === 'Student' ? 'Browse courses' : section === 'My courses' ? 'Add course' : section === 'Users' ? 'Invite a user' : section === 'Study planner' ? 'Plan a session' : section === 'My classes' ? 'Create a class' : section === 'Students' ? 'Export report' : section === 'Analytics' ? 'Download report' : 'Create new'}</button></div>
    {(section === 'My courses' || section === 'Courses') && <><div className="filter-row"><div className="filter-tabs"><button className="selected" onClick={() => onToast('Showing all courses')}>All courses <span>{courses.length}</span></button><button onClick={() => onToast('Filter: In progress')}>In progress</button><button onClick={() => onToast('Filter: Completed')}>Completed</button></div><button className="select-button" onClick={() => onToast('Sorted by recently accessed')}>Recently accessed <span className="chevron">⌄</span></button></div>{courses.length ? <div className="course-grid full-course-grid">{courses.map((course) => <CourseCard key={course.title} course={course} onContinue={onCourse}/>)}</div> : <EmptyState query={search} onClear={() => onToast('Try another search')}/>}</>}
    {section === 'Study planner' && <div className="planner-layout"><article className="panel planner-calendar"><div className="panel-heading"><div><span className="eyebrow">YOUR CALENDAR</span><h2>October 2026</h2></div><div className="calendar-arrows"><button className="icon-button subtle" onClick={() => onToast('Previous week')} aria-label="Previous week">‹</button><button className="icon-button subtle" onClick={() => onToast('Next week')} aria-label="Next week">›</button></div></div><div className="planner-week-head">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => <span key={day}>{day}</span>)}</div><div className="planner-week-days">{[19, 20, 21, 22, 23, 24, 25].map((day, i) => <button key={day} onClick={() => setSelectedDay(i === 2 ? 'Yesterday' : i === 3 ? 'Today' : `${['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][i]}, Oct ${day}`)} className={day === 22 ? 'today' : selectedDay === `Oct ${day}` ? 'chosen' : ''}>{day}{[0, 2, 3, 4, 6].includes(i) && <i/>}</button>)}</div><div className="planner-agenda"><div className="agenda-date"><span className="eyebrow">{selectedDay.toUpperCase()}</span><span>3 sessions planned · 2h 15m</span></div><div className="agenda-item"><span className="agenda-time">9:30</span><i className="agenda-mark purple-line"/><div><strong>Product design</strong><span>Design systems · 45 min</span></div><button onClick={() => onToast('Study session started')}><Icon name="play" size={15}/></button></div><div className="agenda-item"><span className="agenda-time">11:00</span><i className="agenda-mark orange-line"/><div><strong>Modern mathematics</strong><span>Functions & graphs · 1 hr</span></div><button onClick={() => onToast('Study session started')}><Icon name="play" size={15}/></button></div><div className="agenda-item"><span className="agenda-time">15:30</span><i className="agenda-mark green-line"/><div><strong>Review flashcards</strong><span>Biology · 30 min</span></div><button onClick={() => onToast('Study session started')}><Icon name="play" size={15}/></button></div></div></article><article className="panel focus-panel"><div className="focus-icon"><Icon name="spark" size={23}/></div><span className="eyebrow">WEEKLY GOAL</span><strong>8 of 10 hours</strong><p>You’re almost there. Two more focused hours to hit your goal this week.</p><div className="progress-bar"><span style={{ width: '80%' }}/></div><div className="focus-foot"><span>80% complete</span><span>2 hrs to go</span></div><div className="focus-quote">“The secret of getting ahead is getting started.”<span>— Mark Twain</span></div></article></div>}
    {section === 'Assignments' && <Assignments role={role} onToast={onToast}/>}
    {section === 'My classes' && <><div className="class-summary-strip"><span><b>08</b> active classes</span><span><b>284</b> students</span><span><b>12</b> assignments to review</span><button onClick={() => onToast('Showing all classes')}>View all classes <Icon name="arrow" size={16}/></button></div><ClassList onOpen={(name) => onToast(`${name} classroom opened`)}/></>}
    {section === 'Students' && <><div className="filter-row"><div className="filter-tabs"><button className="selected">All students <span>284</span></button><button onClick={() => onToast('Showing students who need help')}>Needs help <span>12</span></button><button onClick={() => onToast('Showing top performers')}>Top performers</button></div><button className="select-button" onClick={() => onToast('Filter by class')}>All classes <span className="chevron">⌄</span></button></div><article className="panel table-panel"><PeopleTable role="Teacher"/></article></>}
    {section === 'Users' && <><div className="filter-row"><div className="filter-tabs"><button className="selected">All users <span>3,004</span></button><button onClick={() => onToast('Showing students')}>Students</button><button onClick={() => onToast('Showing teachers')}>Teachers</button><button onClick={() => onToast('Showing administrators')}>Admins</button></div><button className="select-button" onClick={() => onToast('Sorted by recently joined')}>Recently joined <span className="chevron">⌄</span></button></div><article className="panel table-panel"><PeopleTable role="Admin"/></article></>}
    {section === 'Analytics' && <div className="analytics-grid"><article className="panel activity-panel analytics-main"><div className="panel-heading"><div><span className="eyebrow">LEARNING ENGAGEMENT</span><h2>Weekly active learners</h2></div><button className="select-button" onClick={() => onToast('Showing last 30 days')}>Last 30 days <span className="chevron">⌄</span></button></div><div className="activity-summary"><strong>2,216 learners</strong><span className="trend-up">↗ 14.2%</span><span className="muted">compared to last month</span></div><WeekChart role="Admin"/></article><article className="panel analytics-side"><span className="eyebrow">COURSE COMPLETION</span><h2>Top courses</h2>{[['Product design', 88], ['Mathematics foundations', 76], ['Introduction to biology', 64], ['Creative writing', 59]].map(([name, value], i) => <div className="top-course" key={name}><span className={`top-course-dot dot-${i}`}/><span>{name}</span><strong>{value}%</strong><i><b style={{ width: `${value}%` }}/></i></div>)}</article></div>}
  </section>
}

function Assignments({ role, onToast }) {
  const assignments = role === 'Student' ? [
    ['Product design', 'Design a landing page wireframe', 'Today, 11:59 PM', 'In progress', 'lavender'], ['Modern mathematics', 'Functions practice set', 'Oct 24, 2026', 'Not started', 'peach'], ['Introduction to biology', 'Cell structures lab report', 'Oct 27, 2026', 'Submitted', 'mint'], ['Product design', 'Design critique reflection', 'Oct 29, 2026', 'In progress', 'lavender'],
  ] : [['Year 10 · Mathematics', 'Linear equations practice', 'Due Oct 23', '24 submissions', 'peach'], ['Year 12 · Biology', 'Cell structure lab report', 'Due Oct 25', '18 submissions', 'mint'], ['Year 9 · Design', 'Moodboard and concept', 'Due Oct 27', '12 submissions', 'lavender'], ['Year 10 · Mathematics', 'Functions quiz', 'Due Oct 30', 'Not published', 'peach']]
  return <><div className="filter-row"><div className="filter-tabs"><button className="selected" onClick={() => onToast('Showing all assignments')}>All <span>12</span></button><button onClick={() => onToast('Showing upcoming assignments')}>Upcoming <span>4</span></button><button onClick={() => onToast('Showing completed work')}>{role === 'Student' ? 'Completed' : 'Reviewed'}</button></div><button className="select-button" onClick={() => onToast('Sorted by due date')}>Due date <span className="chevron">⌄</span></button></div><div className="assignment-list">{assignments.map(([course, title, due, status, color]) => <article className="assignment-row" key={title}><span className={`assignment-mark ${color}`}><Icon name={role === 'Student' ? 'check' : 'book'} size={19}/></span><div className="assignment-title"><span className="eyebrow">{course}</span><strong>{title}</strong></div><span className="assignment-due"><Icon name="clock" size={15}/>{due}</span><span className={`status-chip ${status.toLowerCase().replaceAll(' ', '-')}`}>{status}</span><button className="icon-button subtle" onClick={() => onToast(`${title} opened`)} aria-label={`Open ${title}`}><Icon name="arrow" size={17}/></button></article>)}</div></>
}

function EmptyState({ query }) {
  return <div className="empty-state"><span className="empty-icon"><Icon name="search" size={22}/></span><strong>No courses found</strong><p>{query ? `Nothing matched “${query}”. Try another search.` : 'Add your first course to get started.'}</p></div>
}

export default App
