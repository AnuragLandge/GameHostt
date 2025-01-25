CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Email VARCHAR(100) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL
);

CREATE TABLE Tournaments (
    TournamentID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Format ENUM('Group', 'Knockout', 'Group & Knockout') NOT NULL,
    SportType VARCHAR(50) NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    MaxTeams INT, -- Null for single-player tournaments
    IsSinglePlayer BOOLEAN NOT NULL DEFAULT FALSE,
    HostedBy INT,
    FOREIGN KEY (HostedBy) REFERENCES Users(UserID) ON DELETE SET NULL
);

CREATE TABLE Teams (
    TeamID INT AUTO_INCREMENT PRIMARY KEY,
    TeamName VARCHAR(100) NOT NULL,
    TournamentID INT,
    MaxPlayers INT NOT NULL,
    FOREIGN KEY (TournamentID) REFERENCES Tournaments(TournamentID) ON DELETE CASCADE
);

CREATE TABLE Players (
    PlayerID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    TournamentID INT NOT NULL,
    TeamID INT, -- Null for single-player tournaments
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    FOREIGN KEY (TournamentID) REFERENCES Tournaments(TournamentID) ON DELETE CASCADE,
    FOREIGN KEY (TeamID) REFERENCES Teams(TeamID) ON DELETE SET NULL
);

CREATE TABLE TeamMatches (
    MatchID INT AUTO_INCREMENT PRIMARY KEY,
    TournamentID INT NOT NULL,
    MatchDate DATE NOT NULL,
    Stage ENUM('Group', 'Knockout') NOT NULL,
    TeamA INT NOT NULL,
    TeamB INT NOT NULL,
    ScoreTeamA INT DEFAULT 0,
    ScoreTeamB INT DEFAULT 0,
    WinnerTeamID INT,
    FOREIGN KEY (TournamentID) REFERENCES Tournaments(TournamentID) ON DELETE CASCADE,
    FOREIGN KEY (TeamA) REFERENCES Teams(TeamID) ON DELETE CASCADE,
    FOREIGN KEY (TeamB) REFERENCES Teams(TeamID) ON DELETE CASCADE,
    FOREIGN KEY (WinnerTeamID) REFERENCES Teams(TeamID) ON DELETE SET NULL
);

CREATE TABLE PlayerMatches (
    MatchID INT AUTO_INCREMENT PRIMARY KEY,
    TournamentID INT NOT NULL,
    MatchDate DATE NOT NULL,
    Stage ENUM('Group', 'Knockout') NOT NULL,
    PlayerA INT NOT NULL,
    PlayerB INT NOT NULL,
    ScorePlayerA INT DEFAULT 0,
    ScorePlayerB INT DEFAULT 0,
    WinnerPlayerID INT,
    FOREIGN KEY (TournamentID) REFERENCES Tournaments(TournamentID) ON DELETE CASCADE,
    FOREIGN KEY (PlayerA) REFERENCES Players(PlayerID) ON DELETE CASCADE,
    FOREIGN KEY (PlayerB) REFERENCES Players(PlayerID) ON DELETE CASCADE,
    FOREIGN KEY (WinnerPlayerID) REFERENCES Players(PlayerID) ON DELETE SET NULL
);

CREATE TABLE TeamPerformance (
    PerformanceID INT AUTO_INCREMENT PRIMARY KEY,
    TournamentID INT NOT NULL,
    TeamID INT NOT NULL,
    MatchesPlayed INT DEFAULT 0,
    MatchesWon INT DEFAULT 0,
    MatchesLost INT DEFAULT 0,
    Points INT DEFAULT 0,
    FOREIGN KEY (TournamentID) REFERENCES Tournaments(TournamentID) ON DELETE CASCADE,
    FOREIGN KEY (TeamID) REFERENCES Teams(TeamID) ON DELETE CASCADE
);

CREATE TABLE PlayerPerformance (
    PerformanceID INT AUTO_INCREMENT PRIMARY KEY,
    TournamentID INT NOT NULL,
    PlayerID INT NOT NULL,
    MatchesPlayed INT DEFAULT 0,
    MatchesWon INT DEFAULT 0,
    MatchesLost INT DEFAULT 0,
    Points INT DEFAULT 0,
    FOREIGN KEY (TournamentID) REFERENCES Tournaments(TournamentID) ON DELETE CASCADE,
    FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID) ON DELETE CASCADE
);

CREATE TABLE TournamentWinners (
    WinnerID INT AUTO_INCREMENT PRIMARY KEY,
    TournamentID INT NOT NULL,
    WinnerTeamID INT, -- Null for individual tournaments
    WinnerPlayerID INT, -- Null for team tournaments
    FOREIGN KEY (TournamentID) REFERENCES Tournaments(TournamentID) ON DELETE CASCADE,
    FOREIGN KEY (WinnerTeamID) REFERENCES Teams(TeamID) ON DELETE SET NULL,
    FOREIGN KEY (WinnerPlayerID) REFERENCES Players(PlayerID) ON DELETE SET NULL
);

CREATE TABLE UserTournamentAccess (
    AccessID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    TournamentID INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    FOREIGN KEY (TournamentID) REFERENCES Tournaments(TournamentID) ON DELETE CASCADE,
    UNIQUE (UserID, TournamentID)
);CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Email VARCHAR(100) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL
);

CREATE TABLE Tournaments (
    TournamentID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Format ENUM('Group', 'Knockout', 'Group & Knockout') NOT NULL,
    SportType VARCHAR(50) NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    MaxTeams INT, -- Null for single-player tournaments
    IsSinglePlayer BOOLEAN NOT NULL DEFAULT FALSE,
    HostedBy INT,
    FOREIGN KEY (HostedBy) REFERENCES Users(UserID) ON DELETE SET NULL
);

CREATE TABLE Teams (
    TeamID INT AUTO_INCREMENT PRIMARY KEY,
    TeamName VARCHAR(100) NOT NULL,
    TournamentID INT,
    MaxPlayers INT NOT NULL,
    FOREIGN KEY (TournamentID) REFERENCES Tournaments(TournamentID) ON DELETE CASCADE
);

CREATE TABLE Players (
    PlayerID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    TournamentID INT NOT NULL,
    TeamID INT, -- Null for single-player tournaments
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    FOREIGN KEY (TournamentID) REFERENCES Tournaments(TournamentID) ON DELETE CASCADE,
    FOREIGN KEY (TeamID) REFERENCES Teams(TeamID) ON DELETE SET NULL
);

CREATE TABLE TeamMatches (
    MatchID INT AUTO_INCREMENT PRIMARY KEY,
    TournamentID INT NOT NULL,
    MatchDate DATE NOT NULL,
    Stage ENUM('Group', 'Knockout') NOT NULL,
    TeamA INT NOT NULL,
    TeamB INT NOT NULL,
    ScoreTeamA INT DEFAULT 0,
    ScoreTeamB INT DEFAULT 0,
    WinnerTeamID INT,
    FOREIGN KEY (TournamentID) REFERENCES Tournaments(TournamentID) ON DELETE CASCADE,
    FOREIGN KEY (TeamA) REFERENCES Teams(TeamID) ON DELETE CASCADE,
    FOREIGN KEY (TeamB) REFERENCES Teams(TeamID) ON DELETE CASCADE,
    FOREIGN KEY (WinnerTeamID) REFERENCES Teams(TeamID) ON DELETE SET NULL
);

CREATE TABLE PlayerMatches (
    MatchID INT AUTO_INCREMENT PRIMARY KEY,
    TournamentID INT NOT NULL,
    MatchDate DATE NOT NULL,
    Stage ENUM('Group', 'Knockout') NOT NULL,
    PlayerA INT NOT NULL,
    PlayerB INT NOT NULL,
    ScorePlayerA INT DEFAULT 0,
    ScorePlayerB INT DEFAULT 0,
    WinnerPlayerID INT,
    FOREIGN KEY (TournamentID) REFERENCES Tournaments(TournamentID) ON DELETE CASCADE,
    FOREIGN KEY (PlayerA) REFERENCES Players(PlayerID) ON DELETE CASCADE,
    FOREIGN KEY (PlayerB) REFERENCES Players(PlayerID) ON DELETE CASCADE,
    FOREIGN KEY (WinnerPlayerID) REFERENCES Players(PlayerID) ON DELETE SET NULL
);

CREATE TABLE TeamPerformance (
    PerformanceID INT AUTO_INCREMENT PRIMARY KEY,
    TournamentID INT NOT NULL,
    TeamID INT NOT NULL,
    MatchesPlayed INT DEFAULT 0,
    MatchesWon INT DEFAULT 0,
    MatchesLost INT DEFAULT 0,
    Points INT DEFAULT 0,
    FOREIGN KEY (TournamentID) REFERENCES Tournaments(TournamentID) ON DELETE CASCADE,
    FOREIGN KEY (TeamID) REFERENCES Teams(TeamID) ON DELETE CASCADE
);

CREATE TABLE PlayerPerformance (
    PerformanceID INT AUTO_INCREMENT PRIMARY KEY,
    TournamentID INT NOT NULL,
    PlayerID INT NOT NULL,
    MatchesPlayed INT DEFAULT 0,
    MatchesWon INT DEFAULT 0,
    MatchesLost INT DEFAULT 0,
    Points INT DEFAULT 0,
    FOREIGN KEY (TournamentID) REFERENCES Tournaments(TournamentID) ON DELETE CASCADE,
    FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID) ON DELETE CASCADE
);

CREATE TABLE TournamentWinners (
    WinnerID INT AUTO_INCREMENT PRIMARY KEY,
    TournamentID INT NOT NULL,
    WinnerTeamID INT, -- Null for individual tournaments
    WinnerPlayerID INT, -- Null for team tournaments
    FOREIGN KEY (TournamentID) REFERENCES Tournaments(TournamentID) ON DELETE CASCADE,
    FOREIGN KEY (WinnerTeamID) REFERENCES Teams(TeamID) ON DELETE SET NULL,
    FOREIGN KEY (WinnerPlayerID) REFERENCES Players(PlayerID) ON DELETE SET NULL
);

CREATE TABLE UserTournamentAccess (
    AccessID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    TournamentID INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    FOREIGN KEY (TournamentID) REFERENCES Tournaments(TournamentID) ON DELETE CASCADE,
    UNIQUE (UserID, TournamentID)
);