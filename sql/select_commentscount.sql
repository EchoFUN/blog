select pid, count(*) count from comment where approved = 1 and pid in(<%if (pids.length != 0) { %><%= pids %><% } else { %>0<% } %>) group by pid;