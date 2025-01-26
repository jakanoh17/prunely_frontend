import StudySession from "./Intervals/StudySession";

function Main({ elapsedTimesObjs, api, token, children }) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);

  return (
    <main className="main main_type_home-pg">
      {children}
      <StudySession
        elapsedTimesObjs={elapsedTimesObjs}
        api={api}
        token={token}
      />
    </main>
  );
}

export default Main;
