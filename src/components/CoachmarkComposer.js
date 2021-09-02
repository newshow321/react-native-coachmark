export default class CoachmarkComposer {
  constructor(coachmarks) {
    this.coachmarks = coachmarks;
  }
  show() {
    return this.coachmarks.reduce((acc, coachmark) => {
      return acc.then(() => {
        const curr = coachmark;
        if (curr.current && curr.current.show) {
          return curr.current.show();
        }
        return coachmark.show();
      });
    }, Promise.resolve());
  }
}
