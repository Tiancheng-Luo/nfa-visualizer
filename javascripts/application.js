var regex = '(a+b)*';
var nfa = RegexParser.parse(regex); 
NFAVisualizer.visualize('#nfa', nfa);

var events = [];
nfa.addEventListener('yield', function(e) {
  events.push(e);
});

console.log(nfa.accepts('ababaa'));

var previous = null;
step();
function step() {
  if (events.length) {
    var current = document.querySelector('circle.current');
    if (current) {
      previous = events.shift().state;
      var label = document.querySelector('.labels p.current');
      var transition = document.querySelector('path.current');
      current.classList.remove('current');
      label.classList.remove('current');
      if (transition) {
        transition.classList.remove('current');
      }
    }
    var state = events.shift().state;
    var label = document.querySelector('.labels p[for="' + state.label + '"]');
    state = document.querySelector('circle[label="' + state.label + '"]');
    state.classList.add('current');
    label.classList.add('current');
    if (previous) {
      var source = previous.label;
      var destination = state.getAttribute('label');
      var transition = document.querySelector('path[source="' + source + '"][destination="' + destination + '"]');
      if (transition) {
        transition.classList.add('current');
      }
    }
    setTimeout(step, 500);
  }
}